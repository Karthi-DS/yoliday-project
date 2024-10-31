const fs = require('fs/promises');
const path = 'db/projects.json';


async function getData(req,res,next) {
    try {
      const data = await fs.readFile(path, 'utf-8');
      res.status(200).json({status:true,data:JSON.parse(data)})
    } catch (error) {
      console.error('Error reading JSON:', error);
      res.status(404)
    }
  }
  
  async function writeInput(req,res,next) {
    try {
      let body = req.body
      let data = await fs.readFile(path,'utf-8');
      data = await JSON.parse(data);
      data = data.projects
      console.log(data[body.id-1])
      data[body.id-1].input[body.clientId] = body.input;
      await fs.writeFile(path, JSON.stringify({projects:data}, null, 2));
      res.status(200).json({status:true,message:"Data updated successfully."})
    } catch (error) {
      console.error('Error writing JSON:', error);
    }
  }


  module.exports = {getData,writeInput}