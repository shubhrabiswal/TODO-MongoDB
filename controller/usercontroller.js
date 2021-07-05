const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../Models/User')
const ActiveUser = require('../Models/ActiveUser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const env = require('dotenv');
env.config();


require('../passport')

const app = express()
env.config();

let startDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = startDate.getDate();
const month = months[startDate.getMonth()]; // 0 to 11 index
const month1 = startDate.getMonth();
const year = startDate.getFullYear();
const fullDate = day + " " + month + " " + year;
const currentDate = month1 + 1 + "/" + day + "/" + year;

genToken = user => {
  return jwt.sign({
    iss: 'shubhra',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.SECRET_KEY);
}


exports.userRegister = async function (req, res, next) {
    const { email, password } = req.body;
    const newUser = new User({ email, password, date: currentDate })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
  
          .then(user => {
            console.log(newUser)
  
            res.status(200).json({ message: "User Registered Successfully" })
  
          })
  
      })
    })
  }


exports.userLogin = async function (req, res, next) {
  const { email, password } = req.body;

  //Check If User Exists
  await User.findOne({ email: email }).exec((err, user) => {

    if (user) {

      bcrypt.compare(password, user.password, async (err, isMatch) => {

        if (err) throw err;
        if (isMatch) {
          console.log(user._id)
          const token = genToken(user)
          await ActiveUser.find({userId:user._id}).exec((err,usr) => {
            if(usr.length == 0){
              console.log("Active user block",usr.length)
              
              const activeuser = new ActiveUser({
                day:day,
                month:month,
                userId:user._id
              })
              activeuser.save().then((active) => {
                res.status(200).json({ token, userid: user._id })
              })
            }
            else {
               res.status(200).json({ token, userid: user._id })
            }
          
          })
          



        }
        else {
          return res.status(403).json({ message: "Wrong Password" });
        }
      })
      // return res.status(403).json({ error: 'Email is already in use'});

    }
  })

}



exports.getRegisteredUser =  async (req,res) =>{
  await User.find({date:currentDate}).exec((err,user) => {
    if(user) {
      res.status(200).json({todayRegistered:user.length})
    } if (err) {
      res.status(400).json({message:"No User Registered on today"})
    } 
  })
}



