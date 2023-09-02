const Joi = require("joi");

const validatePost = (data) => {
  const postSchema = Joi.object({
    post: Joi.string().required(),
  });
  return postSchema.validate(data);
};
module.exports = { validatePost };
