const express = require('express');
const router = express.Router();
const { register, login , health } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.get("/get",health)

module.exports = router;
