const express =require("express");
const verifyToken = require("../middleware/verifyToken");
const { createPost } = require("../controllers/blogController");

const postRoute=express.Router();


postRoute.post("/createPost",verifyToken,createPost);
postRoute.get("/getAllPosts",verifyToken);
postRoute.delete("/deletePost/:id",verifyToken)


module.exports=postRoute;