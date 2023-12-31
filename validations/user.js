const Joi = require("joi");

const validateResigterUser = (data) => {
  const userSchema = Joi.object({
    surname: Joi.string().required(),
    othernames: Joi.string().required(),
    email_address: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().required(),
    user_name: Joi.string().required(),
    gender: Joi.string().required().valid("male", "female", "others"),
    date_of_birth: Joi.date().required(),
    about_me: Joi.string(),
    occupation: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: Joi.ref("password"),
  });
  return userSchema.validate(data);
};

const validateVerifyUser = (dada) => {
  const userVerificationSchema = Joi.object({
    email_address: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    otp: Joi.string().required(),
  });
  return userVerificationSchema.validate(dada);
};

const validateEmail = (email_address) => {
  const emailSchema = Joi.object({
    email_address: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  return emailSchema.validate(email_address);
};

const validateUpdateUser = (data) => {
  const updateUserSchema = Joi.object({
    surname: Joi.string(),
    othernames: Joi.string(),
    phone: Joi.string(),
    about_me: Joi.string(),
    occupation: Joi.string(),
  });
  return updateUserSchema.validate(data);
};

const validateLoginUser = (data) => {
  const loginSchema = Joi.object({
    email_address: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().required(),
  });
  return loginSchema.validate(data);
};

const validateChangePassword = (data) => {
  const passwordSchema = Joi.object({
    newPassword: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_newPassword: Joi.ref("newPassword"),
  });
  return passwordSchema.validate(data);
};

const validateForgetPassword = (data) => {
  const passwordSchema = Joi.object({
    newPassword: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_newPassword: Joi.ref("newPassword"),
  });
  return passwordSchema.validate(data);
};
const validateOtpType = (data) => {
  const otpTypeSchema = Joi.object({
    otp_type: Joi.string().valid("FORGOT_PASSWORD", "REGISTRATION").required(),
  });
  return otpTypeSchema.validate(data);
};
module.exports = {
  validateResigterUser,
  validateVerifyUser,
  validateEmail,
  validateUpdateUser,
  validateLoginUser,
  validateChangePassword,
  validateForgetPassword,
  validateOtpType,
};
