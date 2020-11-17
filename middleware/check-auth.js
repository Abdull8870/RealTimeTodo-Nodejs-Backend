const jwt = require("jsonwebtoken");

/**
 * @description this is used to check whether the user is authorized
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
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
