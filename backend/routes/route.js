const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/Auth");
const { auth, isStudent, isTeacher } = require("../middlewares/Auth"); // Updated to isTeacher

// Public
router.post("/signup", signup);
router.post("/login", login);

//testing protected route for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "welcome to test route for test"
    });
});

//Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Students"
    });
});


router.get("/teacher", auth, isTeacher, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Teachers"
    });
});

module.exports = router;