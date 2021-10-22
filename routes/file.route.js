let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  router = express.Router(),
  bcrypt = require("bcrypt"),
  sharp = require("sharp");
var User = require("../Model/User");
const path = require("path");
var oName = [];
// Multer File upload settings
const DIR = "./public/uploads";
const DIR_IMG = "public/images";
const DIR_UPL = "public/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    // const fileName = file.originalname.toLowerCase().split(" ").join("-");
    oName.push(file.originalname.split('.')[0]);
    const fileName =
      Date.now() + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/svg+xml" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/zip" ||
      file.mimetype == "application/vnd.ms-powerpoint" ||
      file.mimetype == "application/vnd.ms-excel" ||
      file.mimetype == "application/msword" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// User model
let File = require("../Model/File");

router.post("/upload", upload.array("files", 10), (req, res, next) => {
  const reqFiles = [];
  // console.log(req.files);
  var file = "";
  const url = req.protocol + "://" + req.get("host");
  var compressImgPath = "";
  for (var i = 0; i < req.files.length; i++) {
    compressImgPath = null;
    var format = req.files[i].originalname.split(".")[1];
    if (
      format == "jpg" ||
      format == "jpeg" ||
      format == "JPG" ||
      format == "JPEG"
    ) {
      // console.log("ENTRE A JPG");
      var compressImgPath = DIR_IMG + "/" + Date.now() + ".jpeg";

      sharp(req.files[i].path)
        .resize({width: 500})
        .jpeg({
          quality: 80,
          chromaSubsampling: "4:4:4",
        })
        .toFile(compressImgPath, (err, info) => {
          if (err) {
            res.end();
          } else {
            res.end();
          }
        });
    } else if (format == "png" || format == "PNG") {
      // console.log("ENTRE A PNG");
      var compressImgPath = DIR_IMG + "/" + Date.now() + ".png";

      sharp(req.files[i].path)
        .resize({width: 500})
        .png({
          quality: 80,
          chromaSubsampling: "4:4:4",
        })
        .toFile(compressImgPath, (err, info) => {
          if (err) {
            res.end();
          } else {
            res.end();
          }
        });
    }
    file = url + "/" + DIR_UPL + "/" + req.files[i].filename;
    if (compressImgPath != null) {
      thumb = url + "/" + compressImgPath;
    } else {
      thumb = null;
    }

    var file = new File({
      _id: new mongoose.Types.ObjectId(),
      // user: req.params.user,
      originalName: oName[i],
      user: req.body.user,
      img: file,
      thumbnail: thumb,
      format: format,
      createdAt: req.body.date,
      userID: req.body.userID
    });
    file.save().then((result) => {
      res.end();
    });

    // .catch((err) => {
    //   console.log(err),
    //     res.status(500).json({
    //       error: err,
    //     });
    // });
  }
  oName = []
  // const user = new File({
  //   _id: new mongoose.Types.ObjectId(),
  //   avatar: reqFiles
  // });
  // user.save().then(result => {
  //   console.log(result);
  //   res.status(201).json({
  //     message: "Done upload!",
  //     fileCreated: {
  //       _id: result._id,
  //       avatar: result.avatar
  //     }
  //   })
  // }).catch(err => {
  //   console.log(err),
  //     res.status(500).json({
  //       error: err
  //     });
  // })
});

router.get("/files", async (req, res, next) => {
  var files = await File.find()
  res.end(JSON.stringify(files))
});

router.get("/photos", async (req, res, next) => {
  var files = await File.find({
    $or:[
      {format: {$regex: new RegExp('jpg','i')}},
      {format: {$regex: new RegExp('JPG','i')}},
      {format: {$regex: new RegExp('JPEG','i')}},
      {format: {$regex: new RegExp('jpeg','i')}},
      {format: {$regex: new RegExp('png','i')}},
      {format: {$regex: new RegExp('PNG','i')}},
    ]
  })
  res.end(JSON.stringify(files))
});

router.get("/only-files", async (req, res, next) => {
  var files = await File.find({
    $or: [
      {format: {$regex: new RegExp("docx", "i")}},
      {format: {$regex: new RegExp("DOCX", "i")}},
      {format: {$regex: new RegExp("doc", "i")}},
      {format: {$regex: new RegExp("DOC", "i")}},
      {format: {$regex: new RegExp("xls", "i")}},
      {format: {$regex: new RegExp("XLS", "i")}},
      {format: {$regex: new RegExp("XLSX", "i")}},
      {format: {$regex: new RegExp("xlsx", "i")}},
      {format: {$regex: new RegExp("ppt", "i")}},
      {format: {$regex: new RegExp("PPT", "i")}},
      {format: {$regex: new RegExp("pptx", "i")}},
      {format: {$regex: new RegExp("PPTX", "i")}},
      {format: {$regex: new RegExp("zip", "i")}},
      {format: {$regex: new RegExp("csv", "i")}},
      {format: {$regex: new RegExp("CSV", "i")}},
      {format: {$regex: new RegExp("svg", "i")}},
      {format: {$regex: new RegExp("SVG", "i")}},
      {format: {$regex: new RegExp("pdf", "i")}},
      {format: {$regex: new RegExp("PDF", "i")}},
    ],
  });
  res.end(JSON.stringify(files))
});

router.get("/myfiles/:id", async (req, res, next) => {
  var id = req.params.id;
  var files = await File.find({userID: id})
  res.end(JSON.stringify(files))
});

router.get("/files", async (req, res, next) => {
  var files = await File.find()
  res.end(JSON.stringify(files))
});

router.get("/users/:search", async (req, res) => {
  var search = req.params.search;
  var users = await User.find({
    $or: [
      {fName: {$regex: new RegExp(search, "i")}},
      {lName: {$regex: new RegExp(search, "i")}},
      {email: {$regex: new RegExp(search, "i")}},
    ],
  });
  // console.log(book);
  res.end(JSON.stringify(users));
});

router.get("/", (req, res) => {
  // res.end('Funciona\n');
  // console.log(__dirname);
  res.sendFile(path.join(__dirname  , "../index.html"));
});

router.get("/users", async (req, res) => {
  const {page = 1, limit = 40} = req.query;
  var users = await User.find({},null, {sort: {createdAt: 1, email:1}})
    .limit(limit)
    .skip((page - 1) * limit);
  res.end(JSON.stringify(users));
  //   res.end("funciona users\n");
  //res.sendFile(path.join(__dirname,'pages/about.html'))
});

router.get("/user/:id", async (req, res) => {
  var id = req.params.id;
  // console.log(id);
  var user = await User.findById(id);
  res.end(JSON.stringify(user));
  //   res.end("funciona users\n");
  //res.sendFile(path.join(__dirname,'pages/about.html'))
});

router.post("/user", async (req, res) => {
  var user = new User(req.body);
  user.password = bcrypt.hashSync(req.body.password, 10);
  await user.save();
  res.end();
});

router.put("/user/:id", async (req, res) => {
  var id = req.params.id;
  await User.updateOne({_id: id}, req.body);
  var newUser = await User.findById(id);
  res.send(newUser);
});

router.delete("/user/:id", async (req, res) => {
  var id = req.params.id;
  await User.deleteOne({_id: id});
  res.end();
});

// app.get("/api/files", (req, res) => {
//   res.end("funciona files\n");
//   //res.sendFile(path.join(__dirname, "pages/resume.html"));
// });

// app.get("/api/upload", (req, res) => {
//   res.end("funciona subir\n");
//   //res.sendFile(path.join(__dirname, "pages/portfolio.html"));
// });

router.get("/contact", (req, res) => {
  res.end("funciona contact\n");
  // res.sendFile(path.join(__dirname, "pages/contact.html"));
});

module.exports = router;
