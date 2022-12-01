import { Router } from "express"
import { getAllUsers } from "../controllers/usersController"

export const usersRouter = Router({})

usersRouter.get("/all", getAllUsers)
