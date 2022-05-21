const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Relationship between USER and POST - through COMMENT 
User.hasMany(Post, {
  foreignKey: 'user_id'
});
Post.belongsToMany(User, {
  through: {
    model: Comment, 
    foreignKey: 'post_id', 
    unique: false
  }
});

// Relationship between USER and COMMENT
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// Relationship between POST and COMMENT
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = {
  User, 
  Post, 
  Comment
};