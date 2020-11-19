const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req , res , next) {
    
    const token = req.header('x-auth-token');

    if (!token) {
        console.log('No token');
        return res.status(401).send('No Token , authorization Denied');
    }

    try{
        let decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch (error){
        return res.status(401).send('Invalid Token');
    }
}