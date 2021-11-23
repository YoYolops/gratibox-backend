import supertest from "supertest";
import "../../src/setup.js"
import app from "../../src/app.js";
import { createUser } from "../factories/createUser.js";
import clearAllTables from "../utils/clearAllTables.js";
import connection from "../../src/database/connection.js";

describe("register tests", () => {

    beforeAll(async () => {
        await clearAllTables();
    })

    it("response 422 on sending wrong body", async () => {
        const wrongBody = {}

        const response = await supertest(app)
            .post("/register")
            .send(wrongBody)
        expect(response.status).toEqual(422)
    })

    it("response 201 on sending proper data", async () => {
        const body = createUser();

        const response = await supertest(app)
            .post("/register")
            .send(body)
        expect(response.status).toEqual(201)
    })

    it("response 409 on sending already registered user", async () => {
        const body = createUser();

        const response = await supertest(app)
            .post("/register")
            .send(body)
        expect(response.status).toEqual(201)

        const errorResponse = await supertest(app)
            .post("/register")
            .send(body)
        expect(errorResponse.status).toEqual(409)
    })
})

afterAll(async () => {
    await clearAllTables();
    await connection.end();
})