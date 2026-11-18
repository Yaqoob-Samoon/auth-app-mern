const bcrypt = require("bcryptjs");
const User = require("../models/user"); 
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ---------- SIGNUP ----------
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // create user with dynamic role
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role, 
    });

    // never send the password hash back
    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "User can not be created, please try again later",
    });
  }
};

// ---------- LOGIN ----------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }

    // JWT payload
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // generate token (2 hours)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user.password = undefined;

    // cookie settings for cross-site authentication
    const isProd = process.env.NODE_ENV === "production";
    const options = {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000), 
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    };

    res.cookie("token", token, options);

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed, please try again later",
    });
  }
};