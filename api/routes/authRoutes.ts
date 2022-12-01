import { Router } from "express"
import { auth, logout, me } from "../controllers/authController"
import { inputValidatorsMiddleware, nameIsInvalid, nameIsReuared } from "../utils/validators/validators"

export const authRouter = Router({})

authRouter.post("/", nameIsInvalid, nameIsReuared, inputValidatorsMiddleware, auth)
authRouter.get("/me/:token", me)
authRouter.post("/logout/:token", logout)
