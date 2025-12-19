const jwt = require("jsonwebtoken");
  
require("dotenv").config();



 exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer", "");


    if (!token || token === undefined) {
      return res.status(401).json({ 
        success:false,
        message: "Can not finf token" });
    }

    // verify token
    try {
      const payload = jwt.verify(token,process.env.JWT_SECRET);
      console.log(payload);

      req.user = payload;
    } catch (error) {
        return res.status(401).json({ 
        success:false,
        message: "Token is invalid" });
    }

    next();

  } catch (err) {
    console.error(err);
     return res.status(401).json({ 
        success:false,
        message: "Something went wrong verifying the token",
      err: err.message 
    });
  }
};

// 👨‍🎓 Student role middleware
 exports.isStudent = (req, res, next) => {
  try {
  if (req.user.role !== "student") {
      return res.status(401).json({ 
        success:false,
        message: "This is protected route for Students" });
  }
  next();
}catch(err) {
    return res.status(501).json({ 
        success:false,
        message: "User Role is not matching" });
}
 }


// 👨‍💼 Admin role middleware'

exports.isAdmin = (req , res , next) => {
  try {
    if(req.user.role != "admin") {
      return res.status(401).json({ 
        success:false,
        message: "This is protected route for admin" });
    }

    next();
  }catch(err) {
    return res.status(501).json({ 
        success:false,
        message: "User Role is not matching" });
  }
}
