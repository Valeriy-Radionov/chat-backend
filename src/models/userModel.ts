import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
})

export const User = mongoose.model("users", userSchema)
