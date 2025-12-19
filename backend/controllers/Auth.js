const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const {options} = require("../routes/route");
require("dotenv").config();

exports.signup = async (req , res) => {
  try {
    // get data
    const { name , email , password , role } = req.body;
    
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }
    
    // secure password
   let hashedPassword;
try {
  hashedPassword = await bcrypt.hash(password, 10);
} catch (error) {
  return res.status(500).json({ success:false, message:"Error in hashing password"});
}

    // create user
    const user = await User.create({
      name , 
      email ,
      password: hashedPassword,
      role
    })
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User can not be Created please try again later"
    });
  }
}
//login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields"
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }

    // Create JWT payload
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // Generate token
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

  
    res.cookie("token", token, options);

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User Logged In Successfully",
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Login Failed Please Try Again Later",
    });
  }
};


