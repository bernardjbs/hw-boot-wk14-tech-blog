const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll();
    
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/view-post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          on: {
            col1: sequelize.where(sequelize.col("post.id"), "=", sequelize.col("comments.post_id"))
          }
        }
      ]
    });
    // Serialize the data to pass to view
    const post = postData.get({ plain: true });
    const post_userData = await User.findByPk(post.user_id, { include: [{ model: Comment }] })
    const postOwner = post_userData.get({ plain: true })
    post.postOwner = postOwner.username;

    for (i = 0; i < post.comments.length; i++) {
      const commentOwnerID = post.comments[i].user_id;
      const commentOwnerData = await User.findByPk(commentOwnerID);
      const commentOwner = commentOwnerData.get({ plain: true });
      const commentOwnerUsername = commentOwner.username;
      post.comments[i].commentOwner = commentOwnerUsername;

    }

    res.render('posts', {
      post,
      logged_in: req.session.logged_in,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    console.log(user)
    res.render('dashboard', {
      ...user,
      username: req.session.username,
      logged_in: true,
      page: 'dashboard'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
