var runtimeConfig = {
  baseUrl: '/',
  title:'DistractJS',
  enablePushState: true
};

var buildtimeConfig = {
  client: {
    debug: false,
    stylesheets: [
      runtimeConfig.baseUrl + 'main.css',
      runtimeConfig.baseUrl + 'icons.css'
    ],
    scripts: [
      runtimeConfig.baseUrl + 'main.js'
    ],
    bootstraps: {
      runtimeConfig: runtimeConfig
    }
  },
  paths: {
    // ASS Sources
    mainModule: './main',
    mainHTML: './main/index.html',
    features: './features',
    // Domain Sources
    mainJS: '../../docs/index.js',
    assets: '../../docs/assets',
    pages: '../../docs',
    styles: '../../docs/styles',
    // Output
    dist: '../../dist/docs'
  },
  server: {
    baseUrl:runtimeConfig.baseUrl,
    enableLiveReload: false,
    liveReloadPort: 35729,
    port: 8080,
    enablePushState: runtimeConfig.enablePushState
  },
  styles: {
    enableMinify: true
  },
  markdown: {
    gfm: true,
    tables: true,
    highlight: function (code) {
      return require('highlight.js').highlightAuto(code).value;
    }
  },
  browserify: {
    detectGlobals: true,
    insertGlobals: true,
    debug: false,
    enableUglify: true
  },
  tasks: {
    default: ['dist']
  }
};

module.exports = buildtimeConfig;