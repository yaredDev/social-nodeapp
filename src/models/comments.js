const { DataTypes } = require("sequelize");

module.exports = (Database) => {
  return Database.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cmtText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cmtImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
