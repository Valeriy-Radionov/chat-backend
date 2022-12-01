import { NextFunction, Request, Response } from "express"
import { messsagesCollection, usersCollection, UsersMessageType } from "../common/database/usersDatabase"
import { MessagesErrorType } from "./usersController"

type GetAllMessagesRequestType = {
  senderId: string
}
type AddMessageRequestType = {
  destination: string
  textMessage: string
  themeMessage: string
  senderId: string
  sender: string
}
export const getAllMessages = async (request: Request<GetAllMessagesRequestType>, response: Response<UsersMessageType[] | { msg: string }>, next: NextFunction) => {
  try {
    const id = request.params.senderId
    const user = await usersCollection.findOne({ id: id })
    if (user?.userName) {
      const messages = await messsagesCollection.find({ destination: user.userName }).toArray()
      if (messages.length > 0) {
        return response.status(201).send(messages)
      } else {
        return response.status(201).send({ msg: "You don't have messages" })
      }
    }
  } catch (e) {
    next(e)
  }
}

export const addMessage = async (request: Request<AddMessageRequestType>, response: Response<MessagesErrorType>, next: NextFunction) => {
  try {
    const { destination, textMessage, themeMessage, senderId } = request.body
    if (destination && textMessage && themeMessage && senderId) {
      console.log(destination)
      const user = await usersCollection.findOne({ id: senderId })
      const date = new Date().toLocaleString()
      if (user) {
        const responseData = await messsagesCollection.insertOne({ destination, textMessage, themeMessage, date: date, senderId, sender: user?.userName })
        responseData && response.status(201).send({ msg: "Message sent successfully!", statusCode: 201 })
      }
    } else {
      response.status(400).send({ msg: "Message was not sent!", statusCode: 400 })
    }
  } catch (e) {
    response.status(400).send({ msg: `Error - ${e}`, statusCode: 400 })
  }
}
