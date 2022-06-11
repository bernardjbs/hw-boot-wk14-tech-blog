const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to add a new Comment
router.post('/', withAuth, async (req, res) => {
  console.log('hello there');
  console.log(req.body);
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json({
      message: 'Your request could not be performed, please try again',
      body: err,
    });
  };
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({
        message:
          'The comment you are trying to delete could not be found, please try again',
      });
    };

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json({
      message: 'Your request could not be performed, please try again',
      body: err,
    });
  };
});

module.exports = router;
