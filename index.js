const routes = require("./src/routes/crmRoutes") 
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000

mongoose.connect("mongodb://localhost:27017/CRMdb", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static("public"))
app.use((req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] == "JWT"){
    jwt.verify(req.headers.authorization.split(" ")[1], "RESTFULLAPIs", (err, decode) => {
      if(err){
        req.user = undefined
      }
      req.user = decode;
      next();
    })
  } else {
    req.user = undefined;
    next();
  }
})
routes(app)

app.get('/', (req, res) => {
  res.send("Chandan Is Great!")
})

app.listen(PORT, ()=>{
    console.log("It's Running");
})