module.exports = {
  ERR_USERNAME_IS_TAKEN: new Error("Username is already taken!"),
  ERR_AUTH_FAILED: new Error("Authentification failed!"),
  ERR_AUTH_INVALID: new Error("Your JWT is invalid!"),
  ERR_SOMETHING: new Error("An error has occurred when processing your request. Please try again."),
  ERR_BOARD_PARTICIPATION_INVALID: new Error("You are not part of this board."),
}