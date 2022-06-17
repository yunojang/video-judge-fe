const { browserslist } = require('./package.json');

module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: browserslist[process.env.BABLE_ENV]
    }],
    ["@babel/preset-react", {
      runtime: 'automatic'
    }],
    "@babel/preset-typescript",
  ]
}