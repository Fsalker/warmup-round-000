require("dotenv").config()
let request = require("request-promise-native")

describe("User lifecycle", async() => {
  const GRAPHQL_HOST = `http://${process.env.API_HOST}:${process.env.API_SERVER_TESTING_PORT}/graphql`
  const USERNAME = "gigelovichaz"
  const PASSWORD = "fasw0l3qkrntzi"
  const BIO = "jmekr"
  const NEW_BIO = "jmekrer"
  const BOARD_TITLE = "boardzzzzz :D"
  const BOARD_TITLE_NEW = "boardzzzzz new!!"
  let JWT
  let BOARD_ID

  beforeAll(async(done) => {
    try {
      let runServer = require("./index.js")
      await runServer()

      // console.log("Deleting the previous user...")
      // Get Authentification Token :D
      let query = `query{
        loginUser(input: {username: "${USERNAME}", password: "${PASSWORD}"}){
          jwt
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      if (!r.data.loginUser) // Our job is already finished, because the user doesn't exist :D
        return done()
      jwt = r.data.loginUser.jwt

      // Delete the user
      query = `mutation{
        deleteUser(auth: {jwt: "${jwt}"})
      }`
      r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
    }catch(e){
      //console.log(e)
    }
    done()
  })

  afterAll(() => {
    setTimeout(() => process.exit(0))
  })

  //it("asd", () => {})

  describe("Users", async() => {
    it("Should Create User", async() => {
      let query = `mutation{
        createUser(input: {username: "${USERNAME}", password: "${PASSWORD}", bio: "${BIO}"}){
          jwt
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()
      JWT = r.data.createUser.jwt
    })

    it("Shouldn't Create User because Username is Taken", async() => {
      let query = `mutation{
        createUser(input: {username: "${USERNAME}", password: "${PASSWORD}", bio: "${BIO}"}){
          jwt
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeTruthy()
      console.log(r.errors)
    })

    it("Should Login User", async() => {
      let query = `query{
        loginUser(input: {username: "${USERNAME}", password: "${PASSWORD}"}){
          jwt
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})

      expect(r.errors).toBeFalsy()
    })

    it("Should Update User", async() => {
      let query = `mutation{
        updateUser(auth: {jwt: "${JWT}"}, input: {bio: "${NEW_BIO}"}){
          username,
          bio
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()
    })

    it("Should Get Users", async() => {
      let query = `query{
        getUsers(auth: {jwt: "${JWT}"}){
          username,
          bio
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()

      expect(r.data.getUsers.length).toBeGreaterThanOrEqual(1)
      let myUser = r.data.getUsers.find(user => user.username == USERNAME)
      expect(myUser).toBeTruthy()
      expect(myUser.username).toEqual(USERNAME)
      expect(myUser.bio).toEqual(NEW_BIO)
    })
  })

  describe("Boards", async() => {
    it("Should Create Board", async() => {
      let query = `mutation{
        createBoard(auth: {jwt: "${JWT}"}, input: {title: "${BOARD_TITLE}"}){
          _id
          title
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()
      expect(r.data.createBoard.title).toBe(BOARD_TITLE)
      expect(r.data.createBoard._id).toBeTruthy()
      BOARD_ID = r.data.createBoard._id
    })

    it("Should Update Board", async() => {
      let query = `mutation{
        updateBoard(auth: {jwt: "${JWT}"}, boardId: "${BOARD_ID}", input: {title: "${BOARD_TITLE_NEW}"}){
          _id
          title
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()
      expect(r.data.updateBoard.title).toBe(BOARD_TITLE_NEW)
    })

    it("Should Get Boards", async() => {
      let query = `query{
        getBoards(auth: {jwt: "${JWT}"}){
          _id
          title
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()
      expect(r.data.getBoards.length).toBeGreaterThanOrEqual(1)
      let board = r.data.getBoards.find(board => board._id == BOARD_ID)
      expect(board).toBeTruthy()
      expect(board.title).toEqual(BOARD_TITLE_NEW)
    })

    it("Should not Get Boards with an invalid JWT!", async() => {
      let query = `query{
        getBoards(auth: {jwt: "${JWT+"1"}"}){
          _id
          title
        }
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeTruthy()
      expect(r.errors[0].message).toBe("invalid signature")
    })
  })

  describe("Delete everything!", async() => {
    it("Should Delete User", async() => {
      let query = `mutation{
        deleteUser(auth: {jwt: "${JWT}"})
      }`

      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()
    })

    it("Should Delete Board", async() => {
      let query = `mutation{
        deleteBoard(auth: {jwt: "${JWT}"}, boardId: "${BOARD_ID}")
      }`
      let r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      expect(r.errors).toBeFalsy()

      // The Board should be gone now!!
      query = `query{
        getBoards(auth: {jwt: "${JWT}"}){
          _id
          title
        }
      }`
      r = await request({uri: GRAPHQL_HOST, method: "POST", json: {query}})
      let board = r.data.getBoards.find(board => board._id == BOARD_ID)
      expect(board).toBeFalsy()
    })
  })
})