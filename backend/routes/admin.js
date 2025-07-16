const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config")



adminRouter.post("/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;


    try {
        await adminModel.create({
            email,
            password,
            firstName,
            lastName
        })
    } catch (e) {
        res.status(403).json({
            message: "admin you are not signed up"
        })
    }
    res.json({
        message: "admin you are signed up"
    })
})

adminRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.findOne({
        email: email,
        password: password   //password should be encrpt
    })

    if (admin) {
        const token = jwt.sign({
            id: admin._id

        }, JWT_ADMIN_PASSWORD);
        res.json({
            token:token
        });
    } else {
        res.json({
            message: "token error"

        })
    }
})

adminRouter.post("/course", function (req, res) {
    res.json({
        message: "course created"
    })
})

adminRouter.put("/course", function (req, res) {
    res.json({
        message: "course updated sucessfully"
    })
})

adminRouter.delete("/course/delete", function (req, res) {
    res.json({
        message: " course deleted sucessfully"
    })
})

adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "all courses"
    })
})

module.exports = {
    adminRouter: adminRouter
}