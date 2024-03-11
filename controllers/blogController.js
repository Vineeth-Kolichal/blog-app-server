const Validator =require("fastest-validator");
const models =require("../models");

const v=new Validator()
const createPost=(req,res)=>{
    const postData={
        title: req.body.title,
        content: req.body.content,
        imageUrl: null,
        categoryId: req.body.categoryId,
        userId: req.userData.id
    }
    const schema={
        title:{
            type:"string",
            optional:false
        },
        content:{
            type:"string",
            optional:false
        },
        imageUrl:{
            type:"string",
            optional:true
        },
        categoryId:{
            type:"integer",
            optional:false
        },
        userId:{
            type:"integer",
            optional:false
        }
    }

   const validateResult= v.validate(postData,schema);
   if(validateResult==true){
        models.Category.findByPk(postData.categoryId).then(result=>{
            if(result!=null){
                models.Post.create(postData).then(resu=>{
                    res.status(201).json({message:"post created",post:resu})
                })
            }else{
                res.status(404).json({message:"category not found"});
            }
        })

   }else{
    res.status(400).json({message:"required fields missing",error:validateResult})
   }

}

module.exports={createPost}