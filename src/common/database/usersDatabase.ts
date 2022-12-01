import { MongoClient } from "mongodb"
import { Server } from "socket.io"

export const mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017"

export type UserType = {
  id: string
  userName: string
  token: string
}

export type UsersMessageType = {
  destination: string
  textMessage: string
  themeMessage: string
  senderId: string
  date: string
  sender: string
}
export const client = new MongoClient(mongoUri)
export const usersDb = client.db("users-chat")
export const usersCollection = usersDb.collection<UserType>("users")
export const messsagesCollection = usersDb.collection<UsersMessageType>("messages")
const io = new Server()

export async function runDb() {
  try {
    await client.connect()
    await usersDb.command({ ping: 1 })
    // io.adapter(createAdapter(messsagesCollection))
    // io.listen(3000)
    console.log("Connect seccessfully to database MONGO ")
  } catch {
    console.log("Can't connect to database MONGO")
    await client.close()
  }
}
