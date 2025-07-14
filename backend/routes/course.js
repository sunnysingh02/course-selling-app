const {Router}= require('express');
const courseRouter  = Router();


courseRouter.post("/purchase", function(req, res){
    res.json({
        message: "you have buy course successfully"
    })
})

courseRouter.post("/preview", function(req, res){
    res.json({
        message: "all courses"
    })
})

module.exports={
    courseRouter: courseRouter
}