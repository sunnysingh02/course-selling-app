require('dotenv').config()
console.log(process.env)
const express = require("express");
const app = express();
const mongoose = require('mongoose');

//middlewre for body parse
app.use(express.json());

//routes
//user
const { userRouter } = require("./routes/user");
app.use("/user", userRouter);

//admin
const { adminRouter } = require("./routes/admin");
app.use("/admin", adminRouter);

//course
const { courseRouter } = require("./routes/course");
app.use("/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("listening.....")
}
main();