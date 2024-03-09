const express = require("express");
const { signUp, login } = require("../controllers/userController");
const userRoute = express.Router();
userRoute.post("/signUp", signUp)
userRoute.post("/login",login)
module.exports = userRoute;