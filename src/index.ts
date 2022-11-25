import cors from "cors"
import express from "express"

require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000
const parser = express.json()

app.use(cors())
app.use(parser)

const startApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()
