const jwt=require("jsonwebtoken");
require("dotenv").config()

const verifyToken=(req,res,next)=>{
    try {
        const token=req.headers.autherization.split(" ")[0];
        const userData=jwt.verify(token,process.env.JWT_SECRET);
        req.userData=userData;
        
    } catch (error) {
        res.status(401).json({message:"You are not autherized"})
    }
}

module.exports={verifyToken}