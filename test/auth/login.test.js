import supertest from "supertest";
import "../../src/setup.js"
import app from "../../src/app.js";
import { createUser } from "../factories/createUser.js";
import clearAllTables from "../utils/clearAllTables.js";
import connection from "../../src/database/connection.js";

describe("login tests", () => {
    let userCredentials;

    beforeAll(async () => {
        await clearAllTables();
        const userBody = createUser();
        await supertest(app)
            .post("/register")
            .send(userBody)

        userCredentials = {
            email: userBody.email,
            password: userBody.password
        }
    })

    it("response 422 on wrong body", async () => {
        const response = await supertest(app)
            .post("/login")
            .send({})
        expect(response.status).toEqual(422)
    })

    it("response 404 on non existing user", async () => {
        const fakeUser = createUser();
        const response = await supertest(app)
            .post("/login")
            .send({
                email: fakeUser.email,
                password: fakeUser.password
            })
        expect(response.status).toEqual(404)
    })

    it("response 403 on wrong password", async () => {
        const response = await supertest(app)
            .post("/login")
            .send({
                email: userCredentials.email,
                password: "aleatoriedades"
            })
        expect(response.status).toEqual(403)
    })
}) 

afterAll(async () => {
    await clearAllTables();
    await connection.end();
})