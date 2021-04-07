const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = require("../models/userModel");
const jwt = require('jsonwebtoken');

const User = mongoose.model("User", UserSchema)

const loginRequired = (req, res, next) => {
    if (req.user){
        next();
    }else{
        return res.status(401).json({message : "Unauthorized User!!!"})
    }
}

const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10)
    newUser.save((err, user) => {
        if (err){
            return res.send(err)
        } else {
            user.hashPassword = undefined;
            return res.json(user)
        }
    })

}

const login = (req, res) => {
    User.findOne({email : req.body.email}, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send({message : "Authentication Failed"})
        } else if (user){
            if (!user.comparePassword(req.body.password, user.hashPassword)){
                res.status(401).send({message : "Password is wrong"})
            } else {
                res.json({token : jwt.sign({
                    email : user.email,
                    username : user.username,
                    _id : user.id
                },'RESTFULLAPIs')})
            }
        }
    })
}

module.exports = {
    loginRequired : loginRequired,
    register : register,
    login : login,
}