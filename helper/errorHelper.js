const sendErrorResponse=(res,statusCode,message,error)=>{
    res.status(statusCode).json({message:message,error:error})
}
module.exports={
    sendErrorResponse
}