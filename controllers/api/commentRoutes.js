const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to add a new Comment
router.post('/', withAuth, async (req, res) => {
  console.log('hello there')
  console.log(req.body)
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json({ message: 'Your request could not be performed, please try again', body: err })
  };
});

module.exports = router;