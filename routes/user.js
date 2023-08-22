const express = require('express');
const router = express.Router();
const {registerUser,verifyUser,resendOtp,updateUser} = require('../controllers/user');

router.post('/create-user', registerUser);
router.post('/update-user', updateUser);
router.get('/verify/:email_address/:otp', verifyUser)
router.get('/resend-otp/:email_address', resendOtp)
module.exports = router