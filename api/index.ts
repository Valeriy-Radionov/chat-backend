import cors from "cors"
import express from "express"
import { runDb } from "./common/database/usersDatabase"
import { authRouter } from "./routes/authRoutes"
import { messagesRouter } from "./routes/messagesRoutes"
import { usersRouter } from "./routes/usersRoutes"

require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000
const parser = express.json()

app.use(cors())
app.use(parser)
app.use("/auth", authRouter)
app.use("/messages", messagesRouter)
app.use("/users", usersRouter)

const startApp = async () => {
  try {
    await runDb()
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = app
startApp()
