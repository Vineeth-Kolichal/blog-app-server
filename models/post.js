'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
     Post.belongsTo(models.User)
     Post.hasMany(sequelize.define("Comment"))
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};