let mongoose = require("mongoose")

let User = mongoose.model("User")
let Board = mongoose.model("Board")

const ERR_USERNAME_IS_TAKEN = new Error("Username is already taken!")

module.exports = {
  getUsers: async() => await User.find({}),
  createUser: async({input: {username, password, bio}}) => {
    try {
      if((await User.find({username})).length > 0)
        throw ERR_USERNAME_IS_TAKEN
      let u = new User({username, password, bio})
      await u.save()
      return u
    }catch(e){
      if(e == ERR_USERNAME_IS_TAKEN)
        throw e

      console.log(e)
    }
  },
  updateUser: async({_id, input: {bio}}) => {
    try{
      let u = await User.update({_id}, {bio})

      u = (await User.find({_id}))[0]
      return u
    }catch(e){console.log(e)}
  }
}
