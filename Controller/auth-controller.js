require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
  const { usernameoremail, password } = req.body;

  let user = await User.findOne({ username: usernameoremail }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    user = await User.findOne({ email: usernameoremail }).collation({
      locale: "en",
      strength: 2,
    });
    if (!user) {
      console.log("email errror");
      return res.status(404).redirect("/");
    }
  }

  user
    .authenticate(password)
    .then((isMatched) => {
      if (!isMatched) {
        console.log("password errror");
        return res.status(401).redirect("/");
      }
      console.log("success");
    }).then(()=>{
      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE});
      return res.status(200).cookie('token', token).redirect("/");
    })
    .catch(() => {
      console.log("error catched");
      return res.status(400).redirect("/auth");
    });
};

exports.signup = async (req, res) => {
  const { username, email, fullname, password } = req.body;
  const encyptedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    fullname,
    username,
    email,
    password: encyptedPassword,
  });
  await newUser.save((err) => {
    if (err) {
      return res.status(400).redirect("/");
    }
    const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE,});
      return res.status(201).cookie('token', token).redirect("/");
  });
};


exports.logout = (req,res) => {
  res.cookie('token', null, {expires:new Date(Date.now())});
  console.log('logged out');
  res.status(200).redirect('/');
}

