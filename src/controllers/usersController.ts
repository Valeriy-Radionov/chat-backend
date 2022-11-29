import { nanoid } from "nanoid"
import { usersCollection, UsersMessageType, UserType } from "../common/database/usersDatabase"
import { NextFunction, Request, Response } from "express"
export type MessagesErrorType = {
  msg: string
  statusCode: number
}
export const getAllUsers = async (request: Request, response: Response<UserType[] | MessagesErrorType>, next: NextFunction) => {
  try {
    const users = await usersCollection.find({}).toArray()
    if (users) {
      return response.status(201).send(users)
    } else {
      return response.status(400).send({ msg: "Failed to get user data", statusCode: 400 })
    }
  } catch (e) {
    next(e)
    return response.status(400).send({ msg: "Failed to get user data", statusCode: 400 })
  }
}
