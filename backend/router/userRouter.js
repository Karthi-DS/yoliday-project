const express = require('express');

const userRouter = express.Router();

const { addUser,getUser,updateUser } = require("../controllers/userController.js");


userRouter.post("/adduser", addUser);
userRouter.post("/updateuser", updateUser);
userRouter.post("/getUser", getUser);



module.exports = userRouter;




