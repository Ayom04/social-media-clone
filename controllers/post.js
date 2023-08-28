require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const {
  serverError,
  postCreateMessage,
  editPostUnavailable,
  deletePostMessage,
  postNotFound,
} = require("../constants/messages");
const { validatePost } = require("../validations/post");
const models = require("../models");

const createPost = async (req, res, next) => {
  const { user_id } = req.params;
  const { post } = req.body;
  try {
    const { error } = validatePost(req.body);
    if (error != undefined) throw new Error(error.details[0].message);

    await models.Posts.create({
      post_id: uuidv4(),
      user_id: user_id,
      post: post,
    });

    res.status(201).json({
      status: false,
      message: postCreateMessage,
    });
  } catch (error) {
    res.status(200).json({
      status: true,
      message: error.message || serverError,
    });
  }
};
const editPost = async (req, res) => {
  const { user_id, post_id } = req.params;

  try {
    const { error } = validatePost(req.body);
    if (error != undefined) throw new Error(error.details[0].message);
    const _post = await models.Posts.findOne({
      where: { post_id },
    });
    if (!_post) throw new Error(postNotFound);
    const timeDifference = new Date() - new Date(_post.createdAt);
    const timeDifferenceInMinutes = Math.ceil(timeDifference / (1000 * 60));
    if (timeDifferenceInMinutes > 60) throw new Error(editPostUnavailable);
    await models.Posts.update(req.body, {
      where: {
        post_id: post_id,
        user_id: user_id,
      },
    });
    res.status(200).json({
      status: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(200).json({
      status: true,
      message: error.message || serverError,
    });
  }
};

const deletePost = async (req, res) => {
  const { post_id } = req.params;
  try {
    const _post = await models.Posts.findOne({
      where: { post_id },
    });

    if (!_post) throw new Error(postNotFound);

    await models.Posts.destroy({
      where: { post_id: post_id },
    });

    res.json({
      status: 200,
      message: deletePostMessage,
    });
  } catch (error) {
    res.status(200).json({
      status: true,
      message: error.message || serverError,
    });
  }
};

module.exports = { createPost, editPost, deletePost };
