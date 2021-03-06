const { DataTypes, fn, hook } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (Database) => {
  let User = Database.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "default_dp.png",
    },
  });

  // Hashing password before user is created
  User.beforeCreate(async function (user, options) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // TODO Hashing updated password

  // Compare password when log in or authenticating
  User.prototype.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
  };

  return User;
};
