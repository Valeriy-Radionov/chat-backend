import { NextFunction, Request, Response } from "express"
import { UserType } from "../common/database/usersDatabase"

type GetAllMessagesRequestType = {
  id: string
}
export const getAllMessages = async (request: Request<GetAllMessagesRequestType>, response: Response, next: NextFunction) => {
  // try {
  const userId = request.params.id
  // const userNameCheck = await usersCollection.findOne({ userName: userName })
  // if (userNameCheck) {
  // return response.status(201).json({ msg: "Username already used", status: true, token: userNameCheck.token })
  // }
  // } catch (e) {
  // next(e)
  // return response.status(400).json({ msg: "Request Failure!", status: false, token: "" })
  // }
}
