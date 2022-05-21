// Importing Model and Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');

// Creating an instance of the sequelize connection
const sequelize = require('../config/connection');

class Post extends Model { };

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING, 
      allowNull: false
    }, 
    content: {
      type: DataTypes.TEXT, 
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;