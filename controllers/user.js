let mongoose = require("mongoose")
let User = mongoose.model("User")
let jwt = require("jsonwebtoken")

let {validateJWT} = require("./utils.js")
let {ERR_USERNAME_IS_TAKEN, ERR_AUTH_INVALID, ERR_AUTH_FAILED} = require("./_errorMessages.js")

module.exports = {
  getUsers: async({auth}) => {
    await validateJWT(auth.jwt)
    let users = await User.find({}, {_id: 0, username: 1, bio: 1})
    return users
  },
  loginUser: async({input: {username, password}}) => {
    let user = await User.findOne({username, password})
    if(!user)
      throw ERR_AUTH_FAILED
    return {jwt: jwt.sign({_id: user._id, username}, process.env.JWT_SECRET)}
  },
  isMySessionValid: async({auth}) => {
    await validateJWT(auth.jwt)
    return true
  },
  createUser: async({input: {username, password, bio}}) => {
    if((await User.find({username})).length > 0)
      throw ERR_USERNAME_IS_TAKEN
    let u = new User({username, password, bio})
    await u.save()

    return {jwt: jwt.sign({_id: u._id, username}, process.env.JWT_SECRET)}
  },
  updateUser: async({auth, input: {bio}}) => {
    let _id = (await validateJWT(auth.jwt))._id
    let u = await User.findOneAndUpdate({_id}, {bio}, {new: true})

    return u
  },
  deleteUser: async({auth}) => {
    let _id = (await validateJWT(auth.jwt))._id
    await User.deleteOne({_id})

    return "Deleted! :D"
  }
}