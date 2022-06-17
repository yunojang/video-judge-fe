const HTMLWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const path = require('path');
const paths = require('./paths');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT ?? 10 * 1024 // 10kb
);

module.exports = webpackEnv => {
  const isProduct = webpackEnv === 'production';

  const config = {
    stats: 'errors-warnings',
    mode: isProduct ? 'production' : 'development',
    entry: {
      index: paths.appIndex
    },
    output: {
      path: path.resolve(paths.appDirectory, 'dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: paths.appHtml,
      }),
      new EslintPlugin({
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        eslintPath: require.resolve('eslint'),
        context: paths.appPath,
        exclude: ['node_modules', 'dist'],
      }),
    ],
    devtool: isProduct ? false : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: ["/\.test.[jt]sx?$/", path.resolve(paths.appDirectory, './node_modules')],
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "src": paths.appPath,
      }
    },
  };

  return config;
};
