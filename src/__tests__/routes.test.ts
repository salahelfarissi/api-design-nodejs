import app from "../server"
import supertest from "supertest"

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await supertest(app).get("/")

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Hello World!")
  })
})
