const express = require('express');
const router = express.Router();
const {registerUser,verifyUser,resendOtp,updateUser,logIn,sendMessage} = require('../controllers/user');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.post('/create-user', registerUser);
router.post('/update-user/',authentication,authorization, updateUser);
router.post('/login', logIn)
router.get('/verify/:email_address/:otp', verifyUser)
router.get('/resend-otp/:email_address', resendOtp)

module.exports = router
