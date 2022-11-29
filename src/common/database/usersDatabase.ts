import { connect } from "http2"
import { MongoClient } from "mongodb"
import mongoose from "mongoose"
export const mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017"

export type UserType = {
  id: string
  userName: string
  token: string
}

export type UsersMessageType = {
  id: string
  textMessage: string
  themeMessage: string
  dateOfSend: Date
}
export const client = new MongoClient(mongoUri)

export const usersDb = client.db("users-chat")
export const usersCollection = usersDb.collection<UserType>("users")
export const messsagesCollection = usersDb.collection<UsersMessageType>("messages")

export async function runDb() {
  try {
    await client.connect()
    await usersDb.command({ ping: 1 })
    console.log("Connect seccessfully to database MONGO ")
  } catch {
    console.log("Can't connect to database MONGO")
    await client.close()
  }
}
