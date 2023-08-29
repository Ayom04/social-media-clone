require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { validateComment } = require("../validations/comment");
const models = require("../models");
const {
  serverError,
  postNotFound,
  commentNotFound,
  editCommentMessage,
  commentMessage,
  deleteCommentMessage,
} = require("../constants/messages");
const createComment = async (req, res) => {
  const { user_id, post_id } = req.params;
  const { comment } = req.body;
  try {
    const { error } = validateComment(req.body);
    if (error != undefined) throw new Error(error.details[0].message);
    const _post = await models.Posts.findOne({
      where: { post_id },
    });
    console.log(_post);
    if (!_post) throw new Error(postNotFound);
    await models.Comments.create({
      comment_id: uuidv4(),
      user_id: user_id,
      post_id: post_id,
      comment: comment,
    });
    res.status(201).json({
      status: true,
      message: commentMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const editComment = async (req, res) => {
  const { user_id, comment_id } = req.params;
  const { comment } = req.body;
  try {
    const { error } = validateComment(req.body);
    if (error != undefined) throw new Error(error.details[0].message);

    const _comment = await models.Comments.findOne({
      where: { comment_id },
    });
    if (!_comment) throw new Error(commentNotFound);

    await models.Comments.update(req.body, {
      where: { comment_id, user_id },
    });
    res.status(200).json({
      status: true,
      message: editCommentMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    const _comment = await models.Comments.findOne({
      where: { comment_id },
    });

    if (!_comment) throw new Error(commentNotFound);

    await models.Comments.destroy({
      where: { comment_id: comment_id },
    });

    res.status(200).json({
      status: true,
      message: deleteCommentMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
module.exports = {
  createComment,
  editComment,
  deleteComment,
};
