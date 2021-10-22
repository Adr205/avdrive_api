var express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const mongoose = require("mongoose");
var cors = require("cors");
const config = require("./config");
var User = require("./Model/User");
const PORT = process.env.PORT || 3051;
var app = express();

const fileRoute = require("./routes/file.route");

app.engine("html", require("ejs").renderFile);

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Origin",
    "*",
    "Access-Control-Allow-Methods"
  );
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
//app.use(express.static("public"));

mongoose
  .connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((db) => console.log("db connected"))
  .catch((err) => console.log(err));

// app.get("/api", (req, res) => {
//   // res.end('Funciona\n');
//   res.sendFile(path.join(__dirname, "/index.html"));
// });

// app.get("/api/users", async (req, res) => {
//   const {page = 1, limit = 40} = req.query;
//   var users = await User.find()
//     .limit(limit)
//     .skip((page - 1) * limit);
//   res.end(JSON.stringify(users));
//   //   res.end("funciona users\n");
//   //res.sendFile(path.join(__dirname,'pages/about.html'))
// });

// app.get("/api/user/:id", async (req, res) => {
//   var id = req.params.id;
//   console.log(id)
//   var user = await User.findById(id);
//   res.end(JSON.stringify(user));
//   //   res.end("funciona users\n");
//   //res.sendFile(path.join(__dirname,'pages/about.html'))
// });

// app.post("/api/user", async (req, res) => {
//   var user = new User(req.body);
//   user.password = bcrypt.hashSync(req.body.password, 10);
//   await user.save();
//   res.end()
// });

// app.put("/api/user/:id", async (req, res) => {
//   var id = req.params.id;
//   await User.updateOne({_id: id}, req.body);
//    var newUser = await User.findById(id);
//   res.send(newUser)
// });

// app.delete("/api/user/:id", async (req, res) => {
//   var id = req.params.id;
//   await User.deleteOne({_id: id});
//   res.end();
// });


// app.get("/api/files", (req, res) => {
//   res.end("funciona files\n");
//   //res.sendFile(path.join(__dirname, "pages/resume.html"));
// });

// app.get("/api/upload", (req, res) => {
//   res.end("funciona subir\n");
//   //res.sendFile(path.join(__dirname, "pages/portfolio.html"));
// });

// app.get("/contact", (req, res) => {
//   // res.end('funciona contact\n')
//   res.sendFile(path.join(__dirname, "pages/contact.html"));
// });

app.listen(PORT, () => {
  console.log("Server listening on port:" + PORT);
});

app.use("/api", fileRoute);