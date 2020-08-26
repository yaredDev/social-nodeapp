const isProduction = false;
if (isProduction) {
  module.exports = require("./production");
} else {
  module.exports = require("./development");
}
