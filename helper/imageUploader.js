const multer = require('multer');
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+path.extname(file.originalname));
    }

});

const fileFilter= (req,file,cb)=>{
    console.log(file.mimetype)
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(new Error("Unsupported files",false))
    }
}

const upload=multer({
    storage:storage,
    limit:{
        fileSize:1024*1024*10
    },
    fileFilter:fileFilter
})

module.exports={
    upload
}

