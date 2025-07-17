const {Router}= require('express');
const { purchaseModel, courseModel } = require('../db');
const courseRouter  = Router();
const {userMiddleware}=require("../middleware/user");


courseRouter.post("/purchase",userMiddleware, async function(req, res){
    const userId = req.userId;
    const courseId= req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "you have buy course successfully"
    })
})

courseRouter.get("/preview",userMiddleware, async function(req, res){
    const courses = await courseModel.find({})
    res.json({
        message: "all courses",
        courses
    })
})

module.exports={
    courseRouter: courseRouter
}