const { DataTypes, fn, hooks } = require("sequelize");

module.exports = (Database) => {
  return Database.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
