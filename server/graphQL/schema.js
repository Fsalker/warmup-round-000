let graphql = require("graphql")

module.exports = graphql.buildSchema(`
  type User{
    _id: ID!
    username: String!
    password: String!
    bio: String    
  }
  
  type UserPublicData{
    username: String!
    bio: String
  }
  
  type Board{
    _id: ID!
    title: String!
    participantUserIds: [ID!]
  }
  
  type LoginData{
    jwt: String
  }
  
  
  
  input authorisation{
    jwt: String!
  }
  
  input userCreateInput{
    username: String!
    password: String!
    bio: String
  }
  
  input userLoginInput{
    username: String!
    password: String!
  }
  
  input userUpdateInput{
    bio: String!
  }
  
  input boardCreateInput{
    title: String!
  }
  
  input boardUpdateInput{
    title: String
  }
  
  
  
  type Query{
    getUsers(auth: authorisation): [UserPublicData]
    getBoards(auth: authorisation): [Board]
    loginUser(input: userLoginInput): LoginData
    isMySessionValid(auth: authorisation): Boolean
  }
  
  
  
  type Mutation{
    createUser(input: userCreateInput): LoginData
    updateUser(auth: authorisation, input: userUpdateInput): UserPublicData
    deleteUser(auth: authorisation): String
    
    createBoard(auth: authorisation, input: boardCreateInput): Board
    updateBoard(auth: authorisation, boardId: ID!, input: boardUpdateInput): Board
    deleteBoard(auth: authorisation, boardId: ID!): String
  }
`)