const fs = require('fs/promises');
const path = 'db/users.json';


async function addUser(req,res,next) {
    try {
      let userData = await fs.readFile(path, 'utf-8');
      userData = JSON.parse(userData)
      userData = userData.users;
      let data = await req.body;
      data.savedProjects = [];
      data.id = userData.length+1;
      userData.push(data)
      await fs.writeFile(path, JSON.stringify({users:userData}, null, 2));
    } catch (error) {
      console.error('Error reading JSON:', error);
      res.status(404)
    }
  }
  
  async function getUser(req, res, next) {
    try {
      let userData = await fs.readFile(path, 'utf-8');
      userData = JSON.parse(userData);
      const users = userData.users;
      const data = req.body; // Body data from request
      console.log(users);
  
      for (let user of users) {
        if (user.email === data.email && user.password === data.password) {
          // If a match is found, return success response
          return res.status(200).json({ status: true, message: "User found.", user });
        }
      }
      // If no match is found, return failure response after the loop
      return res.status(200).json({ status: false, message: "User not found." });
  
    } catch (error) {
      console.error('Error reading JSON:', error);
      next(error); // Forward error to the next middleware or error handler
    }
  }
  

async function updateUser(req,res,next) {
    try {
      let userData = await fs.readFile(path, 'utf-8');   
      userData = JSON.parse(userData)
      userData = userData.users;
      let data = await req.body;
      console.log(userData,data)
      userData[data.id-1].savedProjects.push(data.projectId)
      res.status(200).json({status:200,message:"User updated."});
      await fs.writeFile(path, JSON.stringify({users:userData}, null, 2));
    } catch (error) {
      console.error('Error reading JSON:', error);
      res.status(404)
    }
  }



  module.exports = {getUser,addUser,updateUser}