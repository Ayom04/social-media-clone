const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyUser,
  resendOtp,
  updateUser,
  logIn,
  deleteUser,
} = require("../controllers/user");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

/**
 * @swagger
 * /users/create-user:
 *   post:
 *     summary: creates a new user
 *     description: This Creates a new record for the user
 *     tags:
 *       - USERS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: surname
 *         in: body
 *         required: true
 *       - name: othernames
 *         in: body
 *         required: true
 *       - name: email_address
 *         in: body
 *         required: true
 *       - name: phone
 *         in: body
 *         required: true
 *       - name: user_name
 *         in: body
 *         required: true
 *       - name: gender
 *         in: body
 *         required: true
 *       - name: date_of_birth
 *         in: body
 *         required: true
 *       - name: about_me
 *         in: body
 *         required: false
 *       - name: occupation
 *         in: body
 *         required: false
 *       - name: password
 *         in: body
 *         required: true
 *       - name: repeat_password
 *         in: body
 *         required: true
 *     responses:
 *        201:
 *          description: Account created.
 *        422:
 *          Bad Request
 */
router.post("/create-user", registerUser);

/**
 * @swagger
 * /users/login :
 *   post:
 *     summary: logs in a registered user
 *     description: this is to allow the user to be login
 *     tags:
 *       - USERS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email_address
 *         in: body
 *         required: true
 *       - name: password
 *         in: body
 *         required: true
 *     responses:
 *        200:
 *          description: Log in successful.
 *        400:
 *          Bad Request
 */
router.post("/login", logIn);

/**
 * @swagger
 * /users/update-user :
 *   patch:
 *     summary: updates a registered user's profile
 *     description: this enables the user to edit their profile
 *     tags:
 *       - USERS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: surname
 *         in: body
 *         required: false
 *       - name: othernames
 *         in: body
 *         required: false
 *       - name: phone
 *         in: body
 *         required: false
 *       - name: about_me
 *         in: body
 *         required: false
 *       - name: occupation
 *         in: body
 *         required: false
 *     responses:
 *        200:
 *          description: User details updated Successfully.
 *        400:
 *          Bad Request
 */
router.patch("/update-user", authentication, authorization, updateUser);

/**
 * @swagger
 * /users/delete-user :
 *   patch:
 *     summary: verifies a user account
 *     description: this is to allow the user to be verified before using the app.
 *     tags:
 *       - USERS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *     responses:
 *        200:
 *          description: User deleted Succesfully.
 *        400:
 *          Bad Request
 */
router.patch("/delete-user", authentication, authorization, deleteUser);

/**
 * @swagger
 * /users/verify/{email_address}/{otp} :
 *   patch:
 *     summary: logs in a registered user
 *     description: this is to allow the user to be login
 *     tags:
 *       - USERS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email_address
 *         in: path
 *         required: true
 *       - name: otp
 *         in: path
 *         required: true
 *     responses:
 *        200:
 *          description: User verified successfully.
 *        400:
 *          Bad Request
 */
router.patch("/verify/:email_address/:otp", verifyUser);

/**
 * @swagger
 * /users/resend-otp/{email_address}:
 *   post:
 *     summary: resends otps to user.
 *     description: this end point sends otp to the user to verify his.her account.
 *     tags:
 *       - USERS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email_address
 *         in: path
 *         required: true
 *     responses:
 *        200:
 *          description: Otp succesfully sent.
 *        400:
 *          Bad Request
 */
router.get("/resend-otp/:email_address", resendOtp);

module.exports = router;
