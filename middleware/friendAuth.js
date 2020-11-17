const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * @description this is used to check whether the user is authorized and friend with user 
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,"secret_this_should_be_longer");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId,firstName:decodedToken.firstName,
    lastName:decodedToken.lastName };
    User.findOne({ _id:decodedToken.userId }).then((value) => {
      const fId=req.query.friendId;
      let friends=false;
      value.friends.forEach(elem => {
        if(elem.userID==fId){
          friends=true;
        }
      });
      if(friends){
        next();
      }
      else {
        res.status(401).json({ message: "You are not Friends anymore!" });
      }
    },error=>{
        res.status(401).json({ message: "Some Internel error occured" });
    });
  }
   catch (error) {
    res.status(401).json({ message: "Some Internel error occured" });
  }
};
