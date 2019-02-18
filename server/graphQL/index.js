let graphqlHTTP = require("express-graphql")

let schema = require("./schema.js")
let rootValue = require("./rootValue.js")

let graphqlHandler = graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
  formatError: (err) => {
    let errorObj = require("../../controllers/_errorMessages")
    let errorMessages = Object.values(errorObj).map(e => e.message)
    let errorExistsInErrorMessages = errorMessages.find(msg => msg == err.message)

    console.log(err)
    if(errorExistsInErrorMessages || err.message == "jwt must be provided" || err.message=="invalid token" || err.message=="invalid signature")
      return {message: err.message}

    return {message: errorObj.ERR_SOMETHING.message}
  }
})

module.exports = graphqlHandler