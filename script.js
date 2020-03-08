require('svelte/register');
const fs = require('fs');
const showdown = require('showdown');
const { JSDOM } = require('jsdom');
const path = require('path');
const config = require('./data/config.json');
const AppComponent = require('./src/App.svelte').default;
const ejs = require('ejs');

const converter = new showdown.Converter({
  customizedHeaderId: true,
  disableForced4SpacesIndentedSublists: true,
});

function readFile(name) {
  const md = fs.readFileSync(path.resolve('data', name));
  return md;
}

function readFavorite(elm, document) {
  const children = document.querySelectorAll('h3 ~ *');
  return Array.from(elm).map((elm) => ({
    id: elm.id,
    title: elm.textContent,
    blocks: Array.from(document.querySelectorAll('h3')).map((el) => ({
      id: el.id,
      title: el.textContent,
      content: Array.from(children)
        .map((el) => el.outerHTML)
        .join(''),
    })),
  }));
}

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

    config.favorite.music.detail = [
      ...document.querySelectorAll('h3#music + ul'),
      ...document.querySelectorAll('h4 + ul'),
    ]
      .map((el) => el.outerHTML)
      .join('');
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
