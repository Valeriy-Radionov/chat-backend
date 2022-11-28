import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  userName: {
    type: String,
    min: 3,
    max: 40,
    unique: true,
  },
})

export const User = mongoose.model("Users", userSchema)
