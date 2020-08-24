const { DataTypes } = require("sequelize");

module.exports = (Database) => {
  return Database.define("CommentReplies", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cmtrText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cmtrImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
