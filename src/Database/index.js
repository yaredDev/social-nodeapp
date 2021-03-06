const Sequelize = require("sequelize");
const { DB_HOST, DB_NAME, DB_PASS, DB_DIALECT, DB_USER } = require("../config");

const {
  UserModel,
  PostModel,
  CommentModel,
  CommentReplies,
} = require("../models");

// Db instance
const Database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  logging: false,
});

const User = UserModel(Database);
const Post = PostModel(Database);
const Comments = CommentModel(Database);
const CmtReply = CommentReplies(Database);

User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comments);
Comments.belongsTo(Post);
Comments.hasMany(CmtReply);
CmtReply.belongsTo(Comments);

Database.authenticate()
  .then((res) => {
    console.log("Connection has established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error);
  });

Database.sync({ alter: true })
  .then((res) => {
    console.log("Database Sync");
  })
  .catch((err) => {
    console.error("Database sync failed ", err);
  });

module.exports = { User, Post, Comments, CmtReply };
