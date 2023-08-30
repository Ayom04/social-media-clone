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
 * register a new user
 * @swagger
 * /users/create-user:
 *   post:
 *     summary: creates a new account
 *     description: This Creates a new record for the user
 *     tags:
 *       - Account
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
router.patch("/update-user", authentication, authorization, updateUser);
router.post("/login", logIn);
router.patch("/delete-user", authentication, authorization, deleteUser);
router.patch("/verify/:email_address/:otp", verifyUser);
router.get("/resend-otp/:email_address", resendOtp);

module.exports = router;
