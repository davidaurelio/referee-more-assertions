exports.node = {
  env: 'node',
  rootPath: '../',
  tests: [ 'test/*-test.js' ]
};
exports.browser = {
  env: 'browser',
  rootPath: '../',
  tests: [ 'test/*-test.js' ],
  libs: ['node_modules/almond/almond.js'],
  sources: [ 'buster-more-assertions.js' ]
};
