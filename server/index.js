/*
  1. So... How do you do GraphQL authentification properly?

  I have just written a function that looks up the given JWT'S
 username andC/P'd it in every controller function. Can we just
 have some kind of easy to use middleware, please? ... or kindly
 tell me if there is any way to do it without 1337 additional
 packages!!!!!! :D

  2. How do you check whether a thrown error in graphqlHTTP's
  error formatter is a JsonWebTokenError? using instanceof tells
  me that the error is a GraphQLError. Yeah, right... I'll just
  leave it there until someone smarter than me shows me the
  better way to check for it (rather than asserting its message)
  I guess :D
*/

let runServer = async() => {
  try {
    // Config
    require("dotenv").config()
    const PORT = require.main == module ? process.env.API_SERVER_PORT : process.env.API_SERVER_TESTING_PORT

    // Models
    require("./../models")

    // Database
    let databaseHandler = require("./../database")
    let connection = await databaseHandler.getConnection()
    if(process.env.INITIALISE_DATABASE == "true") {
      console.log("Resetting Database...")
      await connection.db.dropDatabase()
    }

    // Server
    let graphqlHandler = require("./graphQL")
    let express = require("express")
    let app = express()
    var bodyParser = require('body-parser');
    app.use(require("cors")())
    app.use(bodyParser.json()); // for parsing application/json
    app.use("/graphql", graphqlHandler)
    app.listen(PORT)
    console.log(`API Server listening on ${PORT} =D`)

    return app
  }catch(e){
    console.log(e)
  }
}

if(require.main == module)
  runServer()

module.exports = runServer
