import { Router } from "express"
import { me } from "../controllers/authController"
import { getAllMessages } from "../controllers/messagesController"

export const messagesRouter = Router({})

messagesRouter.get("/all/:id", getAllMessages)
