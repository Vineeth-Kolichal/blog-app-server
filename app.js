const express=require("express");
const YAML=require("yamljs");
const swaggerUi=require("swagger-ui-express")
const swaggerDoc=YAML.load("./api_doc/swagger.yaml")
const postRoute=require("./routes/postRoutes");
const userRoute = require("./routes/userRoute");
const imageRoute = require("./routes/imageRoute");

const app=express();

app.use(express.json())
app.use("/api/uploads",express.static('uploads'))
app.use("/api/documentation",swaggerUi.serve,swaggerUi.setup(swaggerDoc))
app.use("/api/post",postRoute);
app.use("/api/user",userRoute)
app.use("/api/image",imageRoute)

module.exports=app;