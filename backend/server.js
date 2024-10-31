const express = require('express');
const cors = require("cors")
const app = express();
const PORT = 5000;
const projectRouter = require("./router/projectRouter.js")
const userRouter = require("./router/userRouter.js")

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"))
app.get('/', (req, res) => {
  res.send('Welcome to the main server');
});

app.use("/projects",projectRouter)
app.use("/user",userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
