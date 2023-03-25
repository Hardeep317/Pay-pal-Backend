const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connect = require('./Connect/connect');
const secretKey = "verySecretKey";
const {register, login} = require("./Auth/auth.Controller")
const {addItem, getAllItem, editItem, deleteItem, allUsers} = require("./Controllers/post.Controller")
const cors = require("cors");
const { verifytoken } = require('./Auth/jwtservices');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req,res) => {
    res.send("Hii there from Hardeep")
})

app.post("/register", register);
app.post("/login", login);

// Middleware to verify Users API request by velitate authorization token
app.use((req, res, next) => {
    let token = req.headers.authorization;
    try {
      let verifiedToken = verifytoken(token);
      if (verifiedToken) {
        next();
      } else {
        res.status(401).send({
          responseStatus: "FAILED",
          error: "Unauthorized User",
          data: null,
          request: "OK",
          message: "",
        });
      }
    } catch {
      res.status(401).send({
        responseStatus: "FAILED",
        error: "Unauthorized User",
        data: null,
        request: "OK",
        message: "",
      });
    }
  });


app.post("/addSprint", addItem);
app.get("/details/:email", getAllItem);
app.delete("/deleteItem/:_id", deleteItem);
app.patch("/updateItem/:_id", editItem);
app.get("/allUsers/:email", allUsers);

connect()
.then(() => {
    app.listen(5000, () => {
        console.log("succcess")
    })
})
.catch((err) => {
    console.log(err)
})
// app.listen(5000, async() => {
//     await connect()
//     console.log(`Server started on port ${5000}`)
// });

