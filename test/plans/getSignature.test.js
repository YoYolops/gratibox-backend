import supertest from "supertest";
import "../../src/setup.js"
import app from "../../src/app.js";
import { createUser } from "../factories/createUser.js";
import clearAllTables from "../utils/clearAllTables.js";
import connection from "../../src/database/connection.js";

describe("getSignature", () => {

    let USER;

    beforeAll(async () => {
        await clearAllTables();

        const userBody = createUser();
        await supertest(app).post("/register").send(userBody)
        const response = await supertest(app).post("/login").send({
            email: userBody.email,
            password: userBody.password
        })

        USER = response.body
    })

    it("response 200", async () => {
        const response = await supertest(app)
            .get("/signature")
            .set({ Authorization: `Bearer ${USER.token}` })
        
        expect(response.status).toEqual(200)
    })
})


afterAll(async () => {
    await connection.end();
})