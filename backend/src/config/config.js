var config = {};

config.production = {};
config.test = {};
config.development = {};

config.production.mongodbURI = "mongodb://localhost/rangoPRD"
config.test.mongodbURI = "mongodb://localhost/rangoTST"
config.development.mongodbURI = "mongodb://localhost/rango"

module.exports = config;