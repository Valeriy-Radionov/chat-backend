import { NextFunction, Request, Response } from "express"
import { nanoid } from "nanoid"
import { usersCollection, UserType } from "../common/database/usersDatabase"
export type AuthResponseType = {
  msg: string
  status: boolean
  token: string
}
export type AuthRequestType = {
  name: string
}
export type MeRequestType = {
  token: string
}
export type MeResponseType = {
  msg: string
  isAuth: boolean
}
export const auth = async (request: Request<AuthRequestType>, response: Response<UserType | AuthResponseType>, next: NextFunction) => {
  try {
    const userName = request.body.name
    const userCheck = await usersCollection.findOne({ userName: userName })
    if (userCheck) {
      return response.status(201).json({ id: userCheck.id, userName: userCheck.userName, token: userCheck.token })
    } else {
      const id = nanoid()
      const user = await usersCollection.insertOne({ id: id, userName: userName, token: id })
      return user && response.status(201).json({ id, userName, token: id })
    }
  } catch (e) {
    next(e)
    return response.status(400).json({ msg: "Request Failure!", status: false, token: "" })
  }
}

export const me = async (request: Request<MeRequestType>, response: Response<MeResponseType>, next: NextFunction) => {
  try {
    const token = request.params.token
    if (token) {
      const isToken = await usersCollection.findOne({ token: token })
      if (isToken) {
        return response.status(201).json({ msg: "User autorized", isAuth: true })
      }
    } else {
      return response.status(401).send({ msg: "You are not autorized", isAuth: false })
    }
  } catch (e) {
    next(e)
    return response.status(401).json({ msg: "Failure", isAuth: false })
  }
}

export const logout = async (request: Request<MeRequestType>, response: Response<AuthResponseType>, next: NextFunction) => {
  try {
    const token = request.params.token
    if (token) {
      await usersCollection.findOneAndUpdate({ token: token }, { $set: { isAuth: false } })
      return response.status(201).json({ msg: "User logout!", status: true, token: "" })
    } else {
      return response.status(401).json({ msg: "Failure", status: false, token: "" })
    }
  } catch (e) {
    next(e)
  }
}
