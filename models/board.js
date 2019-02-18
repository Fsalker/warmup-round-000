let mongoose = require("mongoose")

let schema = new mongoose.Schema({
  title: {type: String, required: true},
  participantUserIds: {type: Array, default: []}
})

mongoose.model("Board", schema)