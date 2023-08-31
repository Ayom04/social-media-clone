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
 * creates a new user
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
 * logs in an existing user
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.post("/login", logIn);

/**
 * update a user's details
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.patch("/update-user", authentication, authorization, updateUser);

/**
 * deletes a registered user
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.patch("/delete-user", authentication, authorization, deleteUser);

/**
 * verifies otp sent to user's email address
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.patch("/verify/:email_address/:otp", verifyUser);

/**
 * resend otp to user's email address
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.get("/resend-otp/:email_address", resendOtp);

module.exports = router;
