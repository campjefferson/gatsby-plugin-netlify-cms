"use strict";

var _netlifyIdentityWidget = require("netlify-identity-widget");

var _netlifyIdentityWidget2 = _interopRequireDefault(_netlifyIdentityWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onInitialClientRender = function () {
  _netlifyIdentityWidget2.default.on("init", function (user) {
    if (!user) {
      _netlifyIdentityWidget2.default.on("login", function () {
        document.location.href = "/admin/";
      });
    }
  });
  _netlifyIdentityWidget2.default.init();
};