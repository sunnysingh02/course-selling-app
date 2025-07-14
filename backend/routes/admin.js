const { Router } = require('express');
const adminRouter = Router();



adminRouter.post("/signup", function (req, res) {
    res.json({
        message: "admin you are signed up"
    })
})

adminRouter.post("/signin", function (req, res) {
    res.json({
        message: "admin you are signed in"
    })
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

adminRouter.delete("/course/delete", function(req,res){
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