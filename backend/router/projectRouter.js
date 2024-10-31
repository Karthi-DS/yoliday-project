const express = require('express');

const projectRouter = express.Router();

const { getData,writeInput } = require("../controllers/projectController.js");


projectRouter.post("/writeInput", writeInput);
projectRouter.get("/", getData);


module.exports = projectRouter;




