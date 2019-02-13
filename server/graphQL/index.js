let graphqlHTTP = require("express-graphql")

let schema = require("./schema.js")
let rootValue = require("./rootValue.js")

let graphqlHandler = graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
  /*formatError: (err) => {
    console.log("__________ got an error _____")
    return {message: err, asdf: "12344444"}
  }*/
})

module.exports = graphqlHandler