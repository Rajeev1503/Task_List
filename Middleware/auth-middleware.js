require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).redirect("/auth");
  }

  const verifyTokenData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(verifyTokenData.id);
  next();
};
