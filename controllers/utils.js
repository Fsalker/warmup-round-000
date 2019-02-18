let jwt = require("jsonwebtoken")
let mongoose = require("mongoose")
let {ERR_BOARD_PARTICIPATION_INVALID} = require("./_errorMessages")

let User = mongoose.model("User")
let Board = mongoose.model("Board")

module.exports = {
  validateJWT: (jwtokenCrypted) => {
    let jwtoken = jwt.verify(jwtokenCrypted, process.env.JWT_SECRET)
    return jwtoken
  },
  validateBoardParticipation: async (userId, boardId) => {
    let board = await Board.findOne({_id: boardId, participantUserIds: {$elemMatch: {$eq: userId}}})
    if(!board)
      throw ERR_BOARD_PARTICIPATION_INVALID
  },
  addUserToBoard: async(userId, boardId) => {
    await Board.updateOne({_id: boardId}, {$push: {participantUserIds: userId}})
  }
}