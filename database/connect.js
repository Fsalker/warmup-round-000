let mongoose = require("mongoose")

let getConnection = async() => {
  try {
    let uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/warmup-round-000`
    let settings = {
      poolSize: 5,
      useNewUrlParser: true,
      useCreateIndex: true
    }

    return (await mongoose.connect(uri, settings)).connection
  }catch(e){
    console.log(e)
  }
}

module.exports = getConnection