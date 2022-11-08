const Comment = require('../models/comment');
const TokenGenerator = require('../models/token_generator');

const CommentsController = {
  Index: (req, res) => {
    Comment.find().populate('commentUserId').find(async (err, comments) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ comments: comments, token: token, commentUserId: req.user_id });
    });
  },

  Create: (req, res) => {
    const newComment = {
      message: req.body.message,
      commentUserId: req.user_id
    };

    const comment = new Comment(newComment);

    comment.save(async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  }
}

module.exports = CommentsController;
