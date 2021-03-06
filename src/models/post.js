const { DataTypes, fn, hooks } = require("sequelize");

module.exports = (Database) => {
  return Database.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    contentText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postImg: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};