require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const models = require("../models");
const { validateReaction } = require("../validations/reaction");
const {
  postNotFound,
  reactToPostMessage,
  serverError,
  unreactToPostMessage,
} = require("../constants/messages");

const react = async (req, res) => {
  const { user_id, post_id } = req.params;
  const { reaction } = req.body;

  try {
    const { error } = validateReaction(req.body);
    if (error != undefined) throw new Error(error.details[0].message);

    const _post = await models.Posts.findOne({
      where: { post_id },
    });

    if (!_post) throw new Error(postNotFound);
    await models.Reactions.create({
      reaction_id: uuidv4(),
      post_id,
      user_id,
      reaction,
    });
    res.status(201).json({
      status: true,
      message: reactToPostMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const unReact = async (req, res) => {
  const { user_id, post_id } = req.params;
  try {
    await models.Reactions.destroy({
      where: {
        user_id,
        post_id,
      },
    });
    res.status(200).json({
      status: true,
      message: unreactToPostMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
module.exports = { react, unReact };
