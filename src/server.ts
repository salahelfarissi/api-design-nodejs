import express from "express"
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth"
import { createNewUser, signin } from "./handlers/user"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  console.log("GET /")
  res.status(200)
  res.json({ message: "Hello World!" })
  res.end()
})

app.use("/api", protect, router)

app.post("/user", createNewUser)
app.post("/signin", signin)

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized!" })
  } else if (err.type === "validation") {
    res.status(400).json({ message: "Invalid Input!" })
  } else {
    res.status(500).json({ message: "Internal Server Error!" })
  }
})

export default app
