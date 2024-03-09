const express=require("express");
const postRoute=require("./routes/postRoutes");
const userRoute = require("./routes/userRoute");
const app=express();

app.use(express.json())

app.use("/api/post",postRoute);
app.use("/api/user",userRoute)


module.exports=app;