import supertest from "supertest";
import "../../src/setup.js"
import app from "../../src/app.js";
import { createUser } from "../factories/createUser.js";
import { createSignature } from "../factories/createSignature.js";
import clearAllTables from "../utils/clearAllTables.js";
import connection from "../../src/database/connection.js";
import Populate from "../utils/populate.js";

describe("register signature", () => {

    let USER;
    let PRODUCTS;
    let PLANS;

    beforeAll(async () => {
        await clearAllTables();

        const userBody = createUser();
        await supertest(app).post("/register").send(userBody)
        const response = await supertest(app).post("/login").send({
            email: userBody.email,
            password: userBody.password
        })

        USER = response.body

        const productPromise = Populate.products() 
        const planPromise = Populate.plans()
        const resolveds = await Promise.all([ productPromise, planPromise ])
        PRODUCTS = resolveds[0]
        PLANS = resolveds[1]
    })

    it("Response 422 after sending wrong body", async () => {
        const response = await supertest(app)
            .post("/signature")
            .send({})
            .set({ Authorization: `Bearer ${USER.token}` })

        expect(response.status).toEqual(422)
    })

    it("Response 201 after sending proper body", async () => {
        const signatureBody = createSignature(USER.id, [ PRODUCTS.teasId, PRODUCTS.incensesId ], PLANS.monthId)

        const response = await supertest(app)
            .post("/signature")
            .send(signatureBody)
            .set({ Authorization: `Bearer ${USER.token}` })

        expect(response.status).toEqual(201)
    })
})



afterAll(async () => {
    await connection.end();
})