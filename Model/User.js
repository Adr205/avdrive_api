// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const a ="sasa";
// # 2
var UserSchema = Schema({
  email: String,
  password: String,
  fName: String,
  lName: String,
  priv: {
    type: String,
    default: "user",
  },
  createdAt:{
    type:String,
    default: a,
  },
  img: {
    type: String,
    default: "N/F",
  }
});

// # 3
module.exports = mongoose.model("users", UserSchema);
