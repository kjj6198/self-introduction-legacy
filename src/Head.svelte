<script>
  export let meta;
  const content = {
    title: `自我介紹 - ${meta.name}`,
    name: meta.name,
    description: meta.brief,
    image: meta.avatar,
    'twitter:creator': '@kalanyei',
    'twitter:card': 'summary',
    'og:title': `自我介紹 - ${meta.name}`,
    'og:name': meta.name,
    'og:description': meta.brief,
    'og:image': meta.avatar,
    'og:url': 'https://me.kalan.dev',
    type: 'website'
  };
</script>

<svelte:head>
  <title>{content.title}</title>
  {#each Object.keys(content) as m (m)}
    <meta property={m} content={content[m]} />
  {/each}
</svelte:head>
