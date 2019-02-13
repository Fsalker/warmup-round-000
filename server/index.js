(async() => {
  try {
    // Config
    const INITIALISE_DATABASE = false
    require("dotenv").config()

    // Models
    require("./../models")

    // Database
    let databaseHandler = require("./../database")
    let connection = await databaseHandler.getConnection()
    if(INITIALISE_DATABASE)
      await connection.db.dropDatabase()

    // Server
    let graphqlHandler = require("./graphQL")
    let express = require("express")
    let app = express()
    app.use("/graphql", graphqlHandler)
    app.listen(process.env.API_SERVER_PORT)
    console.log(`API Server listening on ${process.env.API_SERVER_PORT} =D`)
  }catch(e){
    console.log(e)
  }
})()