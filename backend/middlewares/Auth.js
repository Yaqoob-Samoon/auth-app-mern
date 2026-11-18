const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // Fix: safely extract token from Authorization header if it exists
    let token = req.cookies.token || req.body.token;
    if (req.header("Authorization")) {
      token = req.header("Authorization").replace("Bearer ", "");
    }

    if (!token || token === undefined) {
      return res.status(401).json({ 
        success: false,
        message: "Can not find token" 
      });
    }

    // verify token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);

      req.user = payload;
    } catch (error) {
        return res.status(401).json({ 
        success: false,
        message: "Token is invalid" 
      });
    }

    next();

  } catch (err) {
    console.error(err);
     return res.status(401).json({ 
        success: false,
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
          success: false,
          message: "This is protected route for Students" 
        });
    }
    next();
  } catch(err) {
    return res.status(501).json({ 
        success: false,
        message: "User Role is not matching" 
    });
  }
}

// 👨‍🏫 Teacher role middleware (Renamed from isAdmin)
exports.isTeacher = (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(401).json({ 
        success: false,
        message: "This is protected route for teachers" 
      });
    }

    next();
  } catch(err) {
    return res.status(501).json({ 
        success: false,
        message: "User Role is not matching" 
    });
  }
}