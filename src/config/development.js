module.exports = {
  APP_DB_URL: "mongodb://localhost:27017/",
  APP_DB_NAME: "sogesha",
  APP_ENV: "development",
  APP_URL: "localhost",
  APP_PORT: 3000,
  APP_SESSION: {
    secret: "aXyr7hFL2",
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: true,
    },
  },
};
