import { Router } from "express"
import { me } from "../controllers/authController"
import { addMessage, getAllMessages } from "../controllers/messagesController"

export const messagesRouter = Router({})

messagesRouter.get("/all/:senderId", getAllMessages)
messagesRouter.post("/message", addMessage)
