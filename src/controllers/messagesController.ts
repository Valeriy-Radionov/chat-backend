import { NextFunction, Request, Response } from "express"
import { nanoid } from "nanoid"
import { messsagesCollection, UsersMessageType, UserType } from "../common/database/usersDatabase"
import { MessagesErrorType } from "./usersController"

type GetAllMessagesRequestType = {
  userName: string
}
type AddMessageRequestType = {
  destination: string
  textMessage: string
  themeMessage: string
  sender: string
}
export const getAllMessages = async (request: Request<GetAllMessagesRequestType>, response: Response<UsersMessageType[] | { msg: string }>, next: NextFunction) => {
  try {
    const userName = request.body.userName
    const messages = await messsagesCollection.find({ destination: userName }).toArray()
    if (messages.length > 0) {
      return response.status(201).send(messages)
    } else {
      return response.status(201).send({ msg: "You don't have messages" })
    }
  } catch (e) {
    next(e)
  }
}

export const addMessage = async (request: Request<AddMessageRequestType>, response: Response<MessagesErrorType>, next: NextFunction) => {
  try {
    const { destination, textMessage, themeMessage, senderId } = request.body
    if (destination && textMessage && themeMessage) {
      const id = nanoid()
      const date = new Date().toLocaleString()
      const responseData = await messsagesCollection.insertOne({ id: id, destination, textMessage, themeMessage, dateOfSend: date, senderId })
      responseData && response.status(201).send({ msg: "Message sent successfully!", statusCode: 201 })
    } else {
      response.status(400).send({ msg: "Message was not sent!", statusCode: 400 })
    }
  } catch (e) {
    response.status(400).send({ msg: `Error - ${e}`, statusCode: 400 })
  }
}
