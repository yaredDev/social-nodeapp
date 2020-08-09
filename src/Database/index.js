const mongoose = require("mongoose");
const { APP_DB_URL, APP_DB_NAME } = require("../config");

const connect_db = async () => {
  const conn = await mongoose.connect(`${APP_DB_URL}${APP_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
    
    const { host, port } = conn.connection
    console.log(`Database ${APP_DB_NAME} has been connected`)
    console.log(`${host}:${port}`)
};

module.exports = connect_db