const { Router } = require('express');
const userRouter = Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config")



userRouter.post("/signup",async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
//zod validation

    try {
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        })
    } catch (e) {
        res.status(403).json({
            message: "user you are not signed up"
        })
    }
    res.json({
        message: "user you are signed up"
    })
})

userRouter.post("/signin", async function (req, res) {
    const {email, password}=req.body;
    const user= await userModel.findOne({
        email: email,
        password: password    //password encrpt needed
    })
    if(user){
        const token = jwt.sign({
         //user id
         id: user._id,
        }, JWT_USER_PASSWORD);
        
        res.json({
            token: token
        })
    }
   
})
userRouter.get("/purchases", function (req, res) {
    res.json({
        message: "course"
    })
});

module.exports = {
    userRouter: userRouter
}