const sequelize = require('../config/connection');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment')

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const posts of postData) {
    await Post.create({
      ...posts,
      user_id: users[Math.floor(Math.random() * users.length)].id
    });
  }
  // const posts = await Post.bulkCreate(postData);
  const posts = await Post.findAll();

  for (const comments of commentData) {
    await Comment.create({
      ...comments,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id
    });
  }

  process.exit(0);
};

seedDatabase();
