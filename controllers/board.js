let mongoose = require("mongoose")
let Board = mongoose.model("Board")
let jwt = require("jsonwebtoken")

let {validateJWT, validateBoardParticipation, addUserToBoard} = require("./utils.js")
let {ERR_AUTH_INVALID} = require("./_errorMessages.js")

module.exports = {
  createBoard: async({auth, input: {title}}) =>{
    let userId = (await validateJWT(auth.jwt))._id
    let board = await Board.create({title})
    let boardId = board._id
    await addUserToBoard(userId, boardId)

    board = await Board.findOne({_id: boardId})
    return board
  },
  getBoards: async({auth}) => {
    await validateJWT(auth.jwt)

    return Board.find({})
  },
  updateBoard: async({auth, boardId, input: {title}}) => {
    let userId = (await validateJWT(auth.jwt))._id
    await validateBoardParticipation(userId, boardId)

    let board = await Board.findOneAndUpdate({_id: boardId}, {title}, {new: true})
    return board
  },
  deleteBoard: async({auth, boardId}) => {
    let userId = (await validateJWT(auth.jwt))._id
    await validateBoardParticipation(userId, boardId)

    await Board.deleteOne({_id: boardId})

    return "Deleted!! :DD"
  }
}