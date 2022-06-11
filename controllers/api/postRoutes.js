const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to update a user's post by post_id
router.put('/:id', withAuth, async ( req, res ) => {
  console.log(req.body);
  try {
    await Post.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Your post details have successfully been updated' });
  } catch (err) {
    res.status(400).json( { message: 'Your request could not be performed, please try again', body: err });
  };
});

// Route to add a new Post
router.post('/', withAuth, async (req, res) => {
  
  try {
    const newPost = await Post.create({
      ...req.body
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json({ message: 'Your request could not be performed, please try again', body: err })
  };
});

// Route to get a post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    res.status(200).json(post)  
  } catch (err) {
    res.status(500).json({message: 'Your request could not be performed, please try again', body: err })
  }
})

// Route to delete a post 
router.delete('/:id', withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });

    if (commentData) {
      await Comment.destroy({ where: { post_id: req.params.id } });
    };

    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({
        message:
          'The post you are trying to delete could not be found, please try again',
      });
    };

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json({
      message: 'Your request could not be performed, please try again',
      body: err,
    });
  };
});

module.exports = router

