import { NextFunction, Request, Response } from "express"
import { nanoid } from "nanoid"
import { usersCollection } from "../common/database/usersDatabase"
import { User } from "../models/userModel"
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
export const auth = async (request: Request<AuthRequestType>, response: Response<AuthResponseType>, next: NextFunction) => {
  try {
    const userName = request.body.name
    const userNameCheck = await usersCollection.findOne({ userName: userName })
    if (userNameCheck) {
      return response.status(201).json({ msg: "Username already used", status: true, token: userNameCheck.token })
    } else {
      const id = nanoid()
      const user = await usersCollection.insertOne({ id: id, userName: userName, token: id })
      return user && response.status(201).json({ msg: "Success! User created", status: true, token: id })
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
    const token = request.body.token
    console.log(token)
    const user = await usersCollection.findOne({ token: token })
    if (user) {
      await usersCollection.findOneAndUpdate({ id: user.id }, { $set: { isAuth: false, token: "" } })
      return response.status(201).json({ msg: "User logout!", status: true, token: "" })
    } else {
      return response.status(401).json({ msg: "Failure", status: false, token: "" })
    }
  } catch (e) {
    next(e)
  }
}
