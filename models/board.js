let mongoose = require("mongoose")

let schema = new mongoose.Schema({
  title: {type: String, required: true}
})

mongoose.model("Board", schema)