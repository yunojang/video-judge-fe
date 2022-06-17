/* eslint-disable */
'use strict';

process.env.BABLE_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const { webpack } = require('webpack');
const configFactory = require('../config/webpack.config');

const config = configFactory('production');
webpack(config, (err, stats) => {
  if (err) {
    console.error(`WebpackConfigError: ${err}`);
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error('Compile ERROR', info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn('Compile WARN', info.warnings);
  }

  console.log('-------------------finally-------------------')

  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    })
  );
});
