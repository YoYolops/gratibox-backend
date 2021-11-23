import "../../src/setup.js";
import connection from "../../src/database/connection.js";

async function plans() {
    const [ month, week ] = [
        connection.query(`INSERT INTO plans (type) VALUES ('m') RETURNING *;`),
        connection.query(`INSERT INTO plans (type) VALUES ('s') RETURNING *;`)
    ]

    const [ monthResult, weekResult ] = await Promise.all([ month, week ])
    return {
        monthId: monthResult.rows[0].id,
        weekId: weekResult.rows[0].id
    }
}

async function products() {
    const [ teasPromise, incensesPromise, organicProductsPromise ] = [
        connection.query(`INSERT INTO products (name) VALUES ('chás') RETURNING *;`),
        connection.query(`INSERT INTO products (name) VALUES ('incensos') RETURNING *;`),
        connection.query(`INSERT INTO products (name) VALUES ('produtos orgânicos') RETURNING *;`),
    ]

    const [ teas, incenses, organicProducts ] = await Promise.all([ teasPromise, incensesPromise, organicProductsPromise ])

    return {
        teasId: teas.rows[0].id,
        incensesId: incenses.rows[0].id,
        organicProductsId: organicProducts.rows[0].id
    }
}

const Populate = {
    products,
    plans
}

export default Populate;