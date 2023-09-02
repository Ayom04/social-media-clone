const Joi = require("joi");

const validateComment = (data) => {
  const commentSchema = Joi.object({
    comment: Joi.string().required(),
  });
  return commentSchema.validate(data);
};
module.exports = { validateComment };
