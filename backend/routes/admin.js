const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config")
const {adminMiddleware} = require("../middleware/admin");



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

adminRouter.post("/course",adminMiddleware, async function (req, res) {
    const adminId=req.userId
    const {title, description, price, imageURL}=req.body;
    const course = await courseModel.create({
        title: title,
        description:description,
        price:price,
        imageURL:imageURL,
        creatorId: adminId
    })
    res.json({
        message: "course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const {title, description, price, imageURL, courseId}=req.body;
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        price: price,
        imageURL: imageURL
    })
    res.json({
        message: "course updated sucessfully",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware,async function (req, res) {
  const adminId= req.userId;

  const courses =await courseModel.find({
    creatorId: adminId
  })
    res.json({
        message: "all courses",
       courses
    })
})

module.exports = {
    adminRouter: adminRouter
}