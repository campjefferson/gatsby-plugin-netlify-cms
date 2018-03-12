"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCmsCss = new ExtractTextPlugin("cms.css");

function plugins(stage) {
  var commonPlugins = [
  // Output /admin/index.html
  new HtmlWebpackPlugin({
    title: "Content Manager",
    filename: "admin/index.html",
    chunks: ["cms"]
  })];

  switch (stage) {
    case "develop":
      return commonPlugins;
    case "build-javascript":
      return [].concat(commonPlugins, [extractCmsCss]);
    default:
      return [];
  }
}

/**
 * Exclude Netlify CMS styles from Gatsby CSS bundle. This relies on Gatsby
 * using webpack-configurator for webpack config extension, and also on the
 * target loader key being named "css" in Gatsby's webpack config.
 */
function excludeFromLoader(key, config) {
  config.loader(key, function (_ref) {
    var exclude = _ref.exclude,
        configRest = (0, _objectWithoutProperties3.default)(_ref, ["exclude"]);

    var regex = /\/node_modules\/netlify-cms\//;
    if (!exclude) {
      return (0, _extends3.default)({}, configRest, { exclude: regex });
    }
    if (Array.isArray(exclude)) {
      return (0, _extends3.default)({}, configRest, { exclude: [].concat(exclude, [regex]) });
    }
    return (0, _extends3.default)({}, configRest, { exclude: [exclude, regex] });
  });
}

function _module(config, stage) {
  switch (stage) {
    case "build-css":
      excludeFromLoader("css", config);
      return config;
    case "build-javascript":
      excludeFromLoader("css", config);

      // Exclusively extract Netlify CMS styles to /cms.css (filename configured
      // above with plugin instantiation).
      config.loader("cms-css", {
        test: /\.css$/,
        include: [/\/node_modules\/netlify-cms\//],
        loader: extractCmsCss.extract(["css"])
      });
      return config;
    default:
      return config;
  }
}

exports.modifyWebpackConfig = function (_ref2, _ref3) {
  var config = _ref2.config,
      stage = _ref2.stage;
  var modulePath = _ref3.modulePath;

  config.merge({
    entry: {
      cms: [__dirname + "/cms.js", modulePath].filter(function (p) {
        return p;
      })
    },
    plugins: plugins(stage)
  });

  _module(config, stage);

  return config;
};