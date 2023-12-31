require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const models = require("../models");
const otpEnum = require("../constants/enum");
const sendEmail = require("../services/email");
const {
  serverError,
  registerUserMessage,
  invalidPhoneNumber,
  userExists,
  getUsersMesage,
  invalidOTP,
  otpExpired,
  getUserMesage,
  verifyUserMessage,
  unauthorisedAccess,
  otpResentMessage,
  updateUserMessage,
  userNotFound,
  logInMessage,
  invalidCredentials,
  userdeleted,
  deleteUserMessage,
  emailHasNotBeenVerified,
  passwordMisamtch,
  passwordUpdatedSuccesfully,
  resetPasswordOtpSentSuccessfully,
  getUserDetailsMessage,
} = require("../constants/messages");
const {
  validateResigterUser,
  validateVerifyUser,
  validateEmail,
  validateUpdateUser,
  validateLoginUser,
  validateChangePassword,
  validateForgetPassword,
  validateOtpType,
} = require("../validations/user");
const {
  phoneValidation,
  hashPassword,
  generateOtp,
  comparePassword,
} = require("../utils/helpers");

const registerUser = async (req, res) => {
  const { error } = validateResigterUser(req.body);
  const {
    surname,
    othernames,
    phone,
    email_address,
    user_name,
    gender,
    date_of_birth,
    occupation,
    password,
  } = req.body;
  try {
    if (error != undefined) throw new Error(error.details[0].message);

    const validatePhoneNumber = await phoneValidation(phone);
    if (validatePhoneNumber == false) throw new Error(invalidPhoneNumber);

    const checkIfuserExists = await models.Users.findOne({
      attributes: ["phone", "email_address", "user_name"],
      where: {
        email_address,
        phone,
        user_name,
      },
    });
    if (checkIfuserExists) throw new Error(userExists);

    const { hash, salt } = await hashPassword(password);

    const _otp = generateOtp(6);

    await models.Users.create({
      user_id: uuidv4(),
      surname,
      othernames,
      phone,
      email_address,
      user_name,
      gender,
      date_of_birth,
      occupation,
      password_hash: hash,
      password_salt: salt,
    });
    await models.Otps.create({
      otp: _otp,
      otp_type: otpEnum.REGISTRATION,
      otp_id: uuidv4(),
      email_address,
    });
    sendEmail(
      email_address,
      "OTP Verification",
      `Hi ${surname}, Your OTP is ${_otp}. Kindly note that this OTP expires in an hour.`
    );
    res.status(200).json({
      status: true,
      message: registerUserMessage,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const verifyUser = async (req, res) => {
  const { email_address, otp } = req.params;
  console.log(req.params);
  try {
    const { error } = validateVerifyUser(req.params);
    if (error != undefined) throw new Error(error.details[0].message);
    const checkIfuserExists = await models.Otps.findOne({
      where: {
        email_address,
        otp,
      },
    });

    if (!checkIfuserExists) throw new Error(invalidOTP);
    const timeDifference = new Date() - new Date(checkIfuserExists.createdAt);
    const timeDifferenceInMinutes = Math.ceil(timeDifference / (1000 * 60));
    if (timeDifferenceInMinutes > 60) throw new Error(otpExpired);

    await models.Users.update(
      { is_verified: true },
      {
        where: {
          email_address,
        },
      }
    );
    sendEmail(
      email_address,
      "Registration Successful",
      `Hi, We are happy to have you onboard. Let's Express our feeling with words`
    );
    await models.Otps.destroy({
      where: {
        email_address,
        otp,
        otp_type: otpEnum.REGISTRATION,
      },
    });
    res.status(200).json({
      status: true,
      message: verifyUserMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const resendOtp = async (req, res) => {
  const { email_address } = req.params;
  const { otp_type } = req.body;
  const { error } = validateOtpType(req.body);
  try {
    if (error != undefined) throw new Error(error.details[0].message);

    const checkIfuserExists = await models.Users.findOne({
      where: {
        email_address,
      },
    });
    if (!checkIfuserExists) throw new Error(unauthorisedAccess);
    const _otp = generateOtp(6);

    await models.Otps.create({
      otp: _otp,
      otp_type: otp_type,
      otp_id: uuidv4(),
      email_address,
    });
    sendEmail(
      email_address,
      "Resend OTP ",
      `Hi ${checkIfuserExists.othernames}, Your new OTP is ${_otp}. Kindly note that this OTP expires in 5 minutes.`
    );
    res.status(200).json({
      status: true,
      otp: _otp,
      message: otpResentMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const updateUser = async (req, res) => {
  const { email_address } = req.params;
  // console.log(email_address)
  try {
    if (!email_address) throw new Error("Enter a valid email");

    const { error } = validateUpdateUser(req.body);

    if (error != undefined) throw new Error(error.details[0].message);
    await models.Users.update(req.body, {
      where: {
        email_address,
      },
    });

    res.status(200).json({
      status: true,
      message: updateUserMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const logIn = async (req, res) => {
  const { email_address, password } = req.body;

  const { error } = validateLoginUser(req.body);
  try {
    if (error != undefined) throw new Error(error.details[0].message);

    const user = await models.Users.findOne({
      where: {
        email_address,
      },
    });
    if (!user) throw new Error(userNotFound);

    if (user.is_deleted == true) throw new Error(userdeleted);

    if (user.is_verified === false) throw new Error(emailHasNotBeenVerified);
    const checkPasssword = await comparePassword(
      password,
      user.dataValues.password_hash
    );
    if (!checkPasssword) {
      res.status(400);
      throw new Error(invalidCredentials);
    }
    const token = jwt.sign(
      {
        email: user.dataValues.email_address,
        _id: uuidv4(),
      },
      process.env.JWT_SECRET
    );
    console.log(token);
    res.status(200).json({
      status: false,
      message: logInMessage,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const deleteUser = async (req, res) => {
  const { email_address } = req.params;
  try {
    await models.Users.update(
      { is_deleted: true },
      {
        where: { email_address: email_address },
      }
    );

    res.status(200).json({
      status: true,
      message: deleteUserMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const changePassword = async (req, res) => {
  const { email_address, password_hash } = req.params;
  const { newPassword } = req.body;
  const { error } = validateChangePassword(req.body);
  try {
    if (error !== undefined) throw new Error(error.details[0].message);

    const checkPasssword = await comparePassword(newPassword, password_hash);
    if (checkPasssword) throw new Error(passwordMisamtch);

    const { hash, salt } = await hashPassword(newPassword);
    await models.Users.update(
      {
        password_hash: hash,
        password_salt: salt,
      },
      {
        where: { email_address },
      }
    );
    res.status(200).json({
      status: true,
      message: passwordUpdatedSuccesfully,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const startForgetPassword = async (req, res) => {
  const { email_address } = req.params;
  const { error } = validateEmail(req.params);
  try {
    if (error !== undefined) throw new Error(error.details[0].message);
    const _otp = generateOtp(6);

    const user = await models.Users.findOne({
      where: { email_address: email_address },
    });
    if (user.is_deleted) throw new Error(userdeleted);
    if (!user) throw new Error(`User not found`);

    await models.Otps.create({
      otp_id: uuidv4(),
      otp: _otp,
      email_address: email_address,
      otp_type: otpEnum.FORGOT_PASSWORD,
    });
    sendEmail(
      email_address,
      "Reset password",
      `Hi ${user.surname}, Your Reset password OTP is ${_otp}. Kindly go and change your password.`
    );
    res.status(200).json({
      status: true,
      otp: _otp,
      message: resetPasswordOtpSentSuccessfully,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const completeForgetPassword = async (req, res) => {
  const { email_address, otp } = req.params;
  const { newPassword } = req.body;
  const { error } = validateForgetPassword(req.body);
  try {
    if (error !== undefined) throw new Error(error.details[0].message);
    const checkOtp = await models.Otps.findOne({
      where: {
        email_address: email_address,
        otp: otp,
        otp_type: otpEnum.FORGOT_PASSWORD,
      },
    });
    if (!checkOtp) throw new Error(invalidOTP);

    const timeDifference = new Date() - new Date(checkOtp.createdAt);
    const timeDifferenceInMinutes = Math.ceil(timeDifference / (1000 * 60));
    if (timeDifferenceInMinutes > 5) throw new Error(otpExpired);

    const { hash, salt } = await hashPassword(newPassword);
    await models.Users.update(
      {
        password_hash: hash,
        password_salt: salt,
      },
      {
        where: { email_address },
      }
    );
    await models.Otps.destroy({
      where: {
        email_address: email_address,
        otp: otp,
        otp_type: otpEnum.FORGOT_PASSWORD,
      },
    });
    res.status(200).json({
      status: true,
      message: passwordUpdatedSuccesfully,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const getAllUser = async (req, res) => {
  const { apikey } = req.headers;

  try {
    if (apikey !== process.env.Apikey) throw new Error(unauthorisedAccess);
    const users = await models.Users.findAll();
    res.status(200).json({
      status: true,
      message: getUsersMesage,
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const getUser = async (req, res) => {
  const { apikey } = req.headers;
  const { email_address } = req.params;
  try {
    if (apikey !== process.env.Apikey) throw new Error(unauthorisedAccess);
    const user = await models.Users.findOne({
      where: { email_address },
    });
    if (!user) throw new Error(unauthorisedAccess);
    res.status(200).json({
      status: true,
      message: getUserMesage,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const getUserDetails = async (req, res) => {
  const { email_address } = req.params;
  try {
    const userInfo = await models.Users.findOne({
      where: { email_address: email_address },
      attributes: [
        "surname",
        "othernames",
        "phone",
        "email_address",
        "user_name",
        "gender",
        "date_of_birth",
        "occupation",
        "createdAt",
      ],
    });
    res.status(200).json({
      status: true,
      message: getUserDetailsMessage,
      userInfo: userInfo,
    });
  } catch {
    res.status(500).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
module.exports = {
  registerUser,
  verifyUser,
  resendOtp,
  updateUser,
  logIn,
  deleteUser,
  changePassword,
  startForgetPassword,
  completeForgetPassword,
  getAllUser,
  getUser,
  getUserDetails,
};
