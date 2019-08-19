export default {
  htmlAttrs: {
    lang: 'en',
  },

  title: 'HiddenSpace Admin Portal',

  meta: [
    { charset: 'utf-8' },
    { 'http-equiv': 'x-ua-compatible', content: 'ie=edge,chrome=1' },
    { name: 'author', content: 'Liam Potter' },
  ],

  noscript: [
    {
      innerHtml: `
        <h1>Javascript Disabled</h1>
        <p>It appears that you do not have Javascript enabled. The Hidden Space admin portal relies on Javascript for the majority of our features.<p>
        <p>Please enable Javascript and <a href=".">reload</a>.</p>
      `,
    },
  ],
}
