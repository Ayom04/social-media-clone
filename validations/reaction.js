const Joi = require("joi");

const validateReaction = (comment) => {
  const reactionSchema = Joi.object({
    reaction: Joi.string().required().valid("like", "dislike", "love", "haha"),
  });
  return reactionSchema.validate(comment);
};

module.exports = { validateReaction };
