import prisma from "../db"
import { createJWT, hashPassword, comparePasswords } from "../modules/auth"

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    })

    const token = await createJWT(user)
    res.json({ token })
  } catch (e) {
    e.type = "validation"
    next(e)
  }
}

export const signin = async (req, res) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username: req.body.username,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" })
      return
    }
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    const token = await createJWT(user)
    res.json({ token, user })
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" })
    console.log(e)
  }
}
