"use strict";

var _netlifyCms = require("netlify-cms");

var _netlifyCms2 = _interopRequireDefault(_netlifyCms);

require("netlify-cms/dist/cms.css");

var _netlifyIdentityWidget = require("netlify-identity-widget");

var _netlifyIdentityWidget2 = _interopRequireDefault(_netlifyIdentityWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.netlifyIdentity = _netlifyIdentityWidget2.default; /* eslint-disable no-unused-vars */
/* eslint-env browser */

_netlifyIdentityWidget2.default.init();