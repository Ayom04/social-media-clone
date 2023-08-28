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
  invalidOTP,
  otpExpired,
  verifyUserMessage,
  unauthorisedAccess,
  otpResentMessage,
  updateUserMessage,
  userNotFound,
  logInMessage,
  invalidCredentials,
  userdeleted,
  deleteUserMessage,
} = require("../constants/messages");
const {
  validateResigterUser,
  validateVerifyUser,
  validateEmail,
  validateUpdateUser,
  validateLoginUser,
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
    res.status(400).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const resendOtp = async (req, res) => {
  const { email_address } = req.params;
  try {
    const { error, value } = validateEmail(req.params);
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
      otp_type: otpEnum.REGISTRATION,
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
      message: otpResentMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
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
    console.log();
    if (error != undefined) throw new Error(error.details[0].message);
    console.log("qwertyu");
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
    res.status(200).json({
      status: true,
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
    res.status(200).json({
      status: true,
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
};
