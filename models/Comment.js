// Importing Model and Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');

// Creating an instance of the sequelize connection
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true
    }, 
    comment: {
      type: DataTypes.TEXT, 
      allowNull: FontFaceSetLoadEvent, 
    },
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: true, 
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER, 
      allowNull: true, 
      references: {
        model: 'posts', 
        key: 'id'
      }
    }
  }, 
  {
    sequelize, 
    timestamps: true,
    createdAt: 'created_at',
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comment;