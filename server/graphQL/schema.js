let graphql = require("graphql")

module.exports = graphql.buildSchema(`
  type User{
    _id: ID!
    username: String!
    password: String!
    bio: String    
  }
  
  type Board{
    _id: ID!
    title: String!
  }
  
  input userInput{
    username: String!
    password: String!
    bio: String
  }
  
  input userUpdateInput{
    bio: String!
  }
  
  input boardInput{
    title: String!
  }
  
  type Query{
    getUsers: [User]
    getBoards: [Board]
  }
  
  type Mutation{
    createUser(input: userInput): User
    updateUser(_id: ID!, input: userUpdateInput): User
    deleteUser(_id: ID!): String
    
    createBoard(input: boardInput): Board
    updateBoard(_id: ID!, input: boardInput): Board
    deleteBoard(_id: ID!): String
  }
`)