require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const {
  serverError,
  postCreateMessage,
  editPostUnavailable,
  deletePostMessage,
  postNotFound,
  unauthorisedAccess,
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
      status: true,
      message: postCreateMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
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
    res.status(500).json({
      status: false,
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

    res.status(200).json({
      status: true,
      message: deletePostMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const getPost = async (req, res) => {
  const { apikey } = req.headers;
  const { post_id } = req.params;
  try {
    if (apikey !== process.env.Apikey) throw new Error(unauthorisedAccess);

    const post = await models.Posts.findOne({
      where: { post_id: post_id },
    });
    if (!post) throw new Error(postNotFound);
    res.status(200).json({
      status: true,
      message: "Post retrieved successfully",
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const getAllPosts = async (req, res) => {
  const { user_id } = req.params;
  try {
    const allPosts = await models.Posts.findAll({
      where: { user_id },
      attributes: ["post_id", "post", "createdAt", "updatedAt"],
    });
    const fullPost = await Promise.all(
      allPosts.map(async (post) => {
        const comments = await models.Comments.findAll({
          where: { post_id: post.dataValues.post_id },
          attributes: ["comment_id", "comment", "createdAt", "updatedAt"],
        });
        const reactions = await models.Reactions.findAll({
          where: {
            post_id: post.dataValues.post_id,
          },
          attributes: ["reaction_id", "reaction", "createdAt", "updatedAt"],
        });
        return { ...post.dataValues, comments, reactions };
      })
    );
    console.log(fullPost);
    res.status(200).json({
      status: true,
      message: "All post retrieved successfully",
      posts: fullPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
module.exports = { createPost, editPost, deletePost, getPost, getAllPosts };
