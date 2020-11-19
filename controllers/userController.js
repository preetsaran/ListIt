const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const {validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    
    const errors = validationResult(req); // return arr of objs
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        
    let { name, email, password } = req.body ;
        
    try {

        let user = await userModel.findOne({ email });

        if (user){
            return res.status(400).json({ msg: 'user already exists' });
        }

        user = new userModel({ //creating instance of user
            name,
            email
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        //for generating token we need to sign jwt basically need to call jwt.sign() to generate token

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn:3600*24
        }, (err,token) => {
            if (err) throw err;
            res.status(200).json({ token });
        })
            
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
    
}

const getUser = async (req, res) => {

    let user = await userModel.findById(req.user.id ).select('-password');
    res.send(user);

}


module.exports.createUser = createUser;
module.exports.getUser = getUser;