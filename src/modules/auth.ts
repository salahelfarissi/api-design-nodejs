import { error } from "console"
import jwt from "jsonwebtoken"

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  )
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401).json({ message: "Not authorized" })
    return
  }

  const [, token] = bearer.split(" ")

  if (!token) {
    res.status(401).json({ message: "No valid token" })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    res.status(401).json({ message: "Invalid token" })
    console.log(e)
    return
  }
}
