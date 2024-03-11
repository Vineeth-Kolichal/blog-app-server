'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post)
      Comment.belongsTo(models.User)
    }
  }
  Comment.init({
    content: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};