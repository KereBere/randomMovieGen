const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const app = express();
log = console.log
//* Passport Configuration
require("./config/passport")(passport)

//* Connect to DB
mongoose
  .connect("mongodb://localhost:27017/movie-gen", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(session({
  secret: "my_keyboard_cat",
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

//*Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Handlebar settings
app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", "./views"); //It is already default

app.post("/", function (req, res) {
  var demo = {
    name: "Rohan",
    age: 26,
  };
  console.log(req.body)
  res.render("home", {demo : demo});
});


const posts = [
  {
    username: "Ali",
    title: "Post 1"
  },
  {
    username: "Kemal",
    title: "Post 2"
  }
]
app.get("/posts", (req, res)=> {
  console.dir(req.name)
   res.send(posts)
})

app.post("/login", (req, res)=> {

  const username = req.body.username
  const user = {name : username}
  console.log(user)
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
  res.json({accessToken : accessToken})
log(req)
})



function authenticateToken(req, res, next){
  const authHeader = req.headers["authoration"]
  const token = authHeader.split(' ')[1]
   

}

 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Started in port ${PORT}`);
});
































// const JWT_KEY = "jwtactive987";
// let kendim = {
//   name: "gerober",
//   no: 85,
//   value: true,
// };
// const pass = jwt.sign(kendim, JWT_KEY);
// console.log(pass);

// let = gerebe =
//   "eyJhbGciOiJIUzI1NiJ9.and0YWN0aXZlOTg3.ZGbpKx4sjr7AdB8FSNgpxkEsfYA1gRdv8e3AI9BWP08";

// const parseJwt = (token) => {
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch (e) {
//     return null;
//   }
// };
// console.log(parseJwt(gerebe));
