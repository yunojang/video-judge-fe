/* eslint-disable */
'use strict';

process.env.BABLE_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs');
const { webpack } = require('webpack');

const chalk = require('react-dev-utils/chalk');
const {
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevserver.config');
const WebpackDevServer = require('webpack-dev-server');

const paths = require('../config/paths');
const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ?? 5000;

const config = configFactory('development');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const urls = prepareUrls(
  protocol,
  host,
  port,
);
// const useTypeScript = fs.existsSync(paths.appTsConfig);
const appName = require(paths.appPackageJson).name;

const compiler = createCompiler({
  appName,
  config,
  urls,
  // useTypeScript,
  webpack,
});

const proxySettings = require(paths.appPackageJson).proxy ?? {};
const devServerOptions = {
  ...createDevServerConfig(proxySettings),
  port,
  host,
};

const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log(chalk.cyan('Starting the development server...\n'));
  openBrowser(urls.localUrlForBrowser);
});
