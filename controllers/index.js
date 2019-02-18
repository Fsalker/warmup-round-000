let userController = require("./user.js")
let boardController = require("./board.js")

module.exports = {
  ...userController,
  ...boardController
}