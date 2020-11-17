const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer');
const sendgridTransport =require('nodemailer-sendgrid-transport');
const User = require("../models/user");
const SingUp = require("../models/signup");
const crypto =require('crypto');
const appConfig = require('../appConfig');

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_user: appConfig.sendGrid
  }
}));

/**
 * @description this is used to get the all country list and codes
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.getCode = (req, res, next) => {
  let id='5f5cd0e718a7ea249c50684f';
  SingUp.findOne({_id:id})
    .then(code => {
      if (code) {
          res.status(200).json({ message: "SUCCESS",countries:code.countries,phoneCode:code.phoneCode });
      } else {
        res.status(404).json({ message: "NO DATA FOUND" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "GETTING COUNTRY CODES FAILED"
      });
    });
  }

  /**
   * @description this is used to create a new user
   * @author Abdul Rahuman
   * @param {*} req
   * @param {*} res
   */


exports.createUser = (req, res, next) => {
  const email=req.body.email.toLowerCase();
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const country=req.body.country;
  const phoneNumber=req.body.phoneNumber;
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email:email,
      password: hash,
      firstName:firstName,
      lastName:lastName,
      country:country,
      phoneNumber:phoneNumber
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "User already exist kindly login or reset your password"
        });
      });
  });
}


  /**
   * @description this is used for user login
   * @author Abdul Rahuman
   * @param {*} req
   * @param {*} res
   */


exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email.toLowerCase() })
    .then(user => {

      if (!user) {
        return res.status(401).json({
          message: "USER DOESN'T EXIST KINDLY SIGNUP"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "INCORRECT USERNAME AND PASSWORD"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id,firstName:fetchedUser.firstName,
        lastName:fetchedUser.lastName },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        firstName:fetchedUser.firstName,
        lastName:fetchedUser.lastName
      });
      return transporter.sendMail({
        to:fetchedUser.email,
        from:'abdull8870temp@gmail.com',
        subject:"Logged in Successfully",
        html:`<h1>You Have logged
        successfully into the REAL TIME TODO LIST</h1>`
      });
    }).catch((err) => {
      return res.status(401).json({
        message: "SOME INTERNAL ERROR OCCURED"
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

/**
 * @description this is used to send password reset code
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.userReset =(req,res,next)=>{
  let secretCode=Math.floor(Math.random()*90000) + 10000;
  secretCode=secretCode;
  let userId;
  let fname;
  let lname;

  const _email=req.body.email.toLowerCase();

  crypto.randomBytes(32,(err,buffer)=>{
    if(err)
    {
      return res.status(500).json({
        message: "SOME INTERNAL ERROR OCCURED"
      });
    }
    const token=buffer.toString('hex');
    User.findOne({ email:_email }).then(user=>{

      if(!user)
      {
        return res.status(401).json({
          message: "Email Not found"
        });
      }
      userId=user._id;
      fname=user.fistName;
      lname=user.lastName;
      user.resetToken=secretCode;
      user.resetTokenExpiration=Date.now() + 360000;
      return user.save();
    }).then(result=>{
      return transporter.sendMail({
        to:_email,
        from:'abdull8870temp@gmail.com',
        subject:"PASSWORD RESET",
        html:`<p>Your password reset Code is <b> ${secretCode} <b></p>`
      });
    }).then(resut=>{

      return res.status(200).json({
       message: "Reset Link has been Sent Successfully",
       id:userId,
       firstName:fname,
       lastName:lname
     });
    }).catch((err) => {
      return res.status(500).json({
       message: "Some Internal error occured"
     });
    })

  });


}

/**
 * @description this is used to reset the password
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.resetPassword=(req,res,next)=>{
  let resetUser;
  const token=req.body.token;
  const password=req.body.password;
  const id=req.body.id;
  const date=Date.now();
  User.findOne({_id:id,resetToken:token,resetTokenExpiration:{$gt:date}}).
  then((user) => {

    resetUser=user;
    return bcrypt.hash(password,12);
  }).then(hashedPassword=>{
    resetUser.password=hashedPassword;
    resetUser.resetToken=undefined;
    resetUser.resetTokenExpiration=undefined;
    return resetUser.save();
  }).then(result=>{
    return res.status(200).json({
     message: "Your password Has been Reset Successfully"
   });
 }).catch((err) => {
   return res.status(401).json({
     message: "INVALID RESET CODE"
   });
 });
}
