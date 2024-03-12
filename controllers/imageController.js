const imageUpload=(req,res)=>{
    console.log(req.file)
    if(req.file.filename){
        res.status(200).json({message:"Image uploaded successfully",url:req.file.filename})
    }else{
        res.status(500).json({message:"error while uploading image"})
    }
}
module.exports={
    imageUpload
}