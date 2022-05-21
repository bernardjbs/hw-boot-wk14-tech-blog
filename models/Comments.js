// Importing Model and Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');

// Creating an instance of the sequelize connection
const sequelize = require('../config/connection');

class Comments extends Model {};

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true
    }, 
    comment: {
      type: DataTypes.STRING, 
      allowNull: FontFaceSetLoadEvent, 
    }, 
    date: {
      type: DataTypes.DATE, 
      allowNull: false
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;