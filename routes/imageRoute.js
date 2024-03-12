const express=require("express");
const { upload } = require("../helper/imageUploader");
const { imageUpload } = require("../controllers/imageController");
const verifyToken = require("../middleware/verifyToken");

const imageRoute=express.Router();

imageRoute.post("/upload",verifyToken,upload.single('image'),imageUpload);

module.exports=imageRoute;