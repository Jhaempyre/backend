const express = require('express');
const router = express.Router();
const { register, login , health ,updateProfile,getProfileData} = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.get("/get",health)
router.post("/updateProfile",updateProfile)
router.get("/getProfile",getProfileData)

module.exports = router;
