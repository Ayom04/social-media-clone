const express = require('express');
const router = express.Router();
const {registerUser,verifyUser,resendOtp,updateUser,logIn,deleteUser} = require('../controllers/user');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.post('/create-user', registerUser);
router.patch('/update-user/',authentication,authorization, updateUser);
router.post('/login', logIn)
router.patch('/delete-user', authentication,authorization,deleteUser)
router.patch('/verify/:email_address/:otp', verifyUser)
router.get('/resend-otp/:email_address', resendOtp)

module.exports = router
