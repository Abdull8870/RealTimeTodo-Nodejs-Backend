let appConfig = {};

appConfig.port = 3000;
appConfig.sendGrid='your sendgrid Api'
appConfig.db = {
    uri: 'Your MongoDb url'
  }

module.exports = {
    port: appConfig.port,
    db :appConfig.db,
    sendGrid:appConfig.sendGrid
};
