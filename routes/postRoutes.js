const express =require("express");
const verifyToken = require("../middleware/verifyToken");
const { createPost, getAllPosts, addComment, getComments } = require("../controllers/blogController");

const postRoute=express.Router();


postRoute.post("/createPost",verifyToken,createPost);
postRoute.get("/getAllPosts",verifyToken,getAllPosts);
postRoute.post("/addComment",verifyToken,addComment)
postRoute.get("/getComments/:id",verifyToken,getComments)


module.exports=postRoute;