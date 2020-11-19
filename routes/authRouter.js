const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { body } = require('express-validator');  
const { logIn ,authenticatedUser } = require('../controllers/authController');

router
    .route('/')
    .get(auth,authenticatedUser)
    .post(
        [
            body('email', 'Please include valid email').isEmail(),
            body('password', 'Password is required').exists()
        ] , 
        logIn)

module.exports = router;
