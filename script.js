require('svelte/register');
const fs = require('fs');
const showdown = require('showdown');
const { JSDOM } = require('jsdom');
const path = require('path');
const config = require('./data/config.json');
const AppComponent = require('./src/App.svelte').default;
const ejs = require('ejs');
const query = require('./db.js');

const converter = new showdown.Converter({
  customizedHeaderId: true,
  disableForced4SpacesIndentedSublists: true,
});

// function readFile(name) {
//   const md = fs.readFileSync(path.resolve('data', name));
//   return md;
// }

// function readFavorite(elm, document) {
//   const children = document.querySelectorAll('h3 ~ *');
//   return Array.from(elm).map((elm) => ({
//     id: elm.id,
//     title: elm.textContent,
//     blocks: Array.from(document.querySelectorAll('h3')).map((el) => ({
//       id: el.id,
//       title: el.textContent,
//       content: Array.from(children)
//         .map((el) => el.outerHTML)
//         .join(''),
//     })),
//   }));
// }

function read(content) {
  const html = converter.makeHtml(content);
  const { document } = new JSDOM(html).window;

  const elm = document.querySelector('h2');
  const children = document.querySelectorAll('h2 ~ *');

  if (elm.id === 'favorite') {
    config.favorite.travel.meta.images = Array.from(
      document.querySelectorAll('img')
    ).map((elm) => ({
      title: elm.getAttribute('alt'),
      src: elm.getAttribute('src'),
    }));
  }

  return {
    id: elm.id,
    title: elm.textContent,
    content: Array.from(children)
      .map((el) => el.outerHTML)
      .join(''),
  };
}

Object.keys(config.content).forEach((key) => {
  const md = fs.readFileSync(path.resolve('data', config.content[key]));
  config.content[key] = read(md.toString('utf-8'));
});

Object.keys(config.favorite).forEach((key) => {
  const file = config.favorite[key].file;
  if (file) {
    const md = fs.readFileSync(path.resolve('data', file));
    config.favorite[key].detail = read(md.toString('utf-8'));
  }
});

query(
  'SELECT issue_num, title, summary, banner_image FROM edms ORDER BY issue_num DESC LIMIT 80;'
)
  .then((result) => result.rows)
  .then((rows) => {
    config.content.yaoya.meta = rows;
    fs.writeFileSync('data.json', JSON.stringify(config));

    const { html, head } = AppComponent.render({
      config,
    });

    ejs
      .renderFile(path.resolve('public', 'index.ejs'), {
        head,
        html,
        data: JSON.stringify(config),
      })
      .then((result) => {
        fs.writeFileSync(path.resolve('public', 'index.html'), result);
      });
  });
