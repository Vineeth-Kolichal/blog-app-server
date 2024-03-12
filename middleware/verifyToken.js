const jwt=require("jsonwebtoken");
require("dotenv").config()

const verifyToken=(req,res,next)=>{
    

    try {
        const token=req.headers.authorization.split(" ")[1];
        const userData=jwt.verify(token,process.env.JWT_SECRET);
        req.userData=userData;
        next();
        
    } catch (error) {
        res.status(401).json({message:"You are not autherized",error:error})
    }
}

module.exports=verifyToken