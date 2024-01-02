const customApiError = require("./customApiError");
const BadRequest = require("./BadRequest");
const NotFound = require("./not-found");
const UnAuthenticated = require("./not-authenticated");

module.exports = { customApiError, BadRequest, NotFound, UnAuthenticated };
