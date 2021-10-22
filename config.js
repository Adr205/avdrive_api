const config = {
  app: {
    port: process.env.PORT || 3051,
  },

  db: {
    // uri: process.env.URI,
    // uri: "mongodb+srv://a01242469:Ferrari2013@webproject.xkamh.mongodb.net/AVDrivePrueba?retryWrites=true&w=majority",
    uri: "mongodb+srv://a01242469:Ferrari2013@webproject.xkamh.mongodb.net/AVDrive?retryWrites=true&w=majority",
  },

  SECRET_KEY: "angular",
};

module.exports = config;
