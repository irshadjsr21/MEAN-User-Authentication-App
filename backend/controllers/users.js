const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req,res) => {
        User.find({email: req.body.email}, (err, users)=>{
            if(users.length<=0){
                let user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password
                });
                        
                        
                        User.create(user)
                        .then(user => {
                            return res.status(201).json({ 
                                msg: 'User Created',
                                user: {
                                    _id: user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    email: user.email
                                }
                            });
                            
                        })
                        .catch(err => {
                            if(err.errors.email.name=="ValidatorError"){
                                return res.status(400).json({
                                    msg: "Invalid Email"
                                });
                            }
                            console.log(err);
                            return res.status(500).json({
                                msg: "Some Error Occured",
                                error: err
                            });
                        });
            }
            else{
                return res.status(422).json({
                    msg: "Email Already Exist"
                });
            }
        });
    },

    login: (req, res) => {
        jwt.sign({
            sub: req.user._id
        }, process.env.JWT_KEY,
        {
            expiresIn: "20m"  
        },
        (err, token)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    msg: "Some Error Occured"
                })
            }
            res.status(200).json({
                msg: "Login Successful",
                token: token
            });
        });
    },

    secret: (req,res) => {
        const user = {
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            email: req.user.email,
            createdAt: req.user.createdAt
        }
        res.status(200).json({
            secret: "Response",
            user: user
        });
    },

    fail:(req, res) => {
        if(req.params.type == 'unauth'){
            res.status(401).json({
                msg: "You Are Not Authorized User"
            });
        }
        else if(req.params.type == 'login'){
            res.status(401).json({
                msg: "Invalid Email Or Password"
            });
        }
    }
}