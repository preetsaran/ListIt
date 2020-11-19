const userDb = require('../models/userModel')
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const logIn = async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let { email,password } = req.body;

    try {
        let user = await userDb.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid Credentials'
            })
        }

        let isMatch = await bcrypt.compare(password, user.password) ;

        if (!isMatch) {
            return res.status(404).json({
                msg: 'Invalid Credentials'
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600*24
        }, (err , token) => {
            if (err) throw(err);
            res.status(200).json({
                token,
                id: user.id,
                name: user.name,
                email:user.email,
                success: 'user LoggedIn'
            });
        })
        
    }
    catch (error) {
        console.log('error.message');
        res.status(500).send('Server Error');
    }

}

const authenticatedUser = async (req, res) => {

    let user = await userDb.findById(req.user.id ).select('-password');
    res.send(user);

}

module.exports.logIn = logIn;
module.exports.authenticatedUser = authenticatedUser;