// Importing Model and Datatypes from sequelize
const { Model, DataTypes }  = require('sequelize');
// Importing bcript for hashing passwords
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPwd) {
    return bcrypt.compareSync(loginPwd, this.password);
  };
};

User.init(
  {
    id: DataTypes.INTEGER, 
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }, 
  {
    username: DataTypes.STRING, 
    allowNull: false
  }, 
  {
    password: DataTypes.STRING, 
    allowNull: false, 
    validate: {
      len: [8]
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;