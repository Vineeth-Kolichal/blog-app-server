const express =require("express");
const verifyToken = require("../middleware/verifyToken");
const { createPost, getAllPosts, addComment } = require("../controllers/blogController");

const postRoute=express.Router();


postRoute.post("/createPost",verifyToken,createPost);
postRoute.get("/getAllPosts",verifyToken,getAllPosts);
postRoute.post("/addComment",verifyToken,addComment)
postRoute.delete("/deletePost/:id",verifyToken)


module.exports=postRoute;