
const models = require("../models")
const Validator = require("fastest-validator");
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken");
const { sendErrorResponse } = require("../helper/errorHelper");

const secret="secret"
const v = new Validator();
const signUp = (req, res) => {
    const details = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const schema = {
        name: {
            type: "string",
            optional: false
        },
        email: {
            type: "string",
            optional: false
        },
        password: {
            type: "string",
            optional: false
        }
    }
   
    const validateResult = v.validate(details, schema);
    if (validateResult == true) {
        models.User.findOne({
            where: {
                email: details.email
            }
        }).then(result => {
            if (result) {
                sendErrorResponse(res, 409, "Failed to create new user", [{ message: "email already exist" }])
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(details.password, salt, (err, hash) => {
                        details.password = hash;
                        models.User.create(details).then(result => {
                            res.status(201).json({ message: "user created successfully", error: [] });
                        }).catch(error => {
                            sendErrorResponse(res, 400, "error while creating user", [{ message: error }]);
                        });
                    })
                })

            }
        })

    } else {
        sendErrorResponse(res, 404, "Failed to create new user", validateResult)
    }



}

const login=(req,res)=>{
    const credentials={
        email:req.body.email,
        password:req.body.password
    }
    console.log(credentials)
    const schema={
        email:{
            type:"string",
            optional:false
        },
        password:{
            type:"string",
            optional:false
        }
    }
    const validateResult=v.validate(credentials,schema);
    if(validateResult==true){
        models.User.findOne({where:{
            email:credentials.email
        }}).then(user=>{
            if(user){
                bcrypt.compare(credentials.password,user.password,(err,result)=>{
                    if(result){
                       
                        const token=jwt.sign({email:user.email,id:user.id},secret)
                        res.status(200).json({message:"successfully logged in",token:token})

                    }else{
                        sendErrorResponse(res,400,"Password is wrong")
                    }
                })

            }else{
                sendErrorResponse(res,404,"Provided email id is not registered with us",[])
            }
        })
    }else{
        sendErrorResponse(res,409,"error",validateResult)
    }

}

module.exports = {
    signUp,
    login
}