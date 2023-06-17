const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    res.status(200).json({
      status: "suucess",
      user
    });
  } catch (err) {
    res.status(404).json({
      status: "failur",
      err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(404).json({
            status: "Failure",
            message:"Please enter email and password",
        });
    }
    const user = await User.findOne({email}).select('+password');
    if(!user || !(await user.verifyPassword(password, user.password))){
        res.status(404).json({
            status: "Failure",
            message:"Email or password is incorrect",
        });
    }
    const jwtToken = jwt.sign({user:user._id},process.env.SECRET_KEY,{
        expiresIn: "5d"
    })
    res.status(200).json({
        status: "suucess",
        message:"Successfully logged in",
        jwtToken
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      err,
        });
    }
};

exports.protect = async (req,res,next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(" ")[1];
  }

  if(!token) {
    res.status(404).json({
      status: "failure",
      message: "Token Invalid"
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
  const user = await User.findById(decoded.user);
  req.user = user;
  next();

}