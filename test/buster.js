exports.browser = {
  env: 'browser',
  rootPath: '../',
  libs: ['node_modules/almond/almond.js'],
  sources: [
    'buster-more-assertions.js'
  ],
  tests: [
    'test/*-test.js'
  ]
};
exports.node = {
  env: 'node',
  rootPath: '../',
  tests: [
    'test/*-test.js'
  ]
};
