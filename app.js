const express=require("express");
const YAML=require("yamljs");
const swaggerUi=require("swagger-ui-express")
const swaggerDoc=YAML.load("./api_doc/swagger.yaml")
const postRoute=require("./routes/postRoutes");
const userRoute = require("./routes/userRoute");

const app=express();
app.use(express.json())

app.use("/api/doc",swaggerUi.serve,swaggerUi.setup(swaggerDoc))
app.use("/api/post",postRoute);
app.use("/api/user",userRoute)


module.exports=app;