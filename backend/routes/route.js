const express = require("express");
const router = express.Router();
const { login , signup } = require("../controllers/Auth");
const { auth , isStudent , isAdmin} = require("../middlewares/Auth");




// Public
router.post("/signup", signup);
router.post("/login", login);

//testing protected route for single middleware
router.get("/test", auth, (req,res)=> {
    res.json({
        sucess:true,
        message: "welcome to tes route for test"
    });
});

//Protected Routes

router.get("/student" , auth , isStudent , (req , res)=> {
    res.json({
        sucess:true,
        message: "Welcome to the protected route for Students "
    });
});

router.get("/admin", auth, isAdmin , (req , res) => {
        res.json({
            sucess:true,
            message:"Welcome to the protected route for Admin"
        });
});




module.exports = router;
