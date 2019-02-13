let mongoose = require("mongoose")

let schema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  bio: String
})

mongoose.model("User", schema)