import connection from "../database/connection.js";
import { signatureSchema } from "../database/schemas.js";

export async function signature(req, res) {
    if(signatureSchema.validate(req.body).error) return res.sendStatus(422)

    const {
        userId,
        productId,
        addressee,
        cep,
        day,
        complement,
        planId
    } = req.body;

    try {
        const delivery = await connection.query(
            'INSERT INTO deliveries (name, cep, day, complement) VALUES ($1, $2, $3, $4) RETURNING *;',
            [ addressee, cep, day, complement ]
        )
        const signature = await connection.query(
            'INSERT INTO signatures (user_id, delivery_id, plan_id) VALUES ($1, $2, $3) RETURNING *;',
            [ userId, delivery.rows[0].id, planId ]
        )

        const orderPromises = productId.map(id => {
            connection.query('INSERT INTO orders (signature_id, product_id) VALUES ($1, $2);', [ signature.rows[0].id, id ])
        })

        await Promise.all(orderPromises)

        return res.sendStatus(201)
        
    } catch(e) {
        console.error("signature FAILURE")
        console.error(e)
        res.sendStatus(500)
    }
}

export async function getSignatures(req, res) {
    const token = req.headers.authorization.replace("Bearer ", "");
    
    try {
        const userId = await connection.query('SELECT user_id FROM sessions WHERE token = $1;', [ token ]);

        const signatureData = await connection.query(
            `SELECT deliveries.day, plans.type, signatures.id, signatures.created_at FROM signatures
            JOIN deliveries ON signatures.delivery_id = deliveries.id
            JOIN plans ON signatures.plan_id = plans.id
            WHERE signatures.user_id = $1;`,
            [ userId.rows[0].user_id ]
        )
        const products = await connection.query(
            'SELECT name FROM products WHERE id IN (SELECT product_id FROM orders WHERE signature_id = $1)',
            [ signatureData.rows[0].id ]
        )

        const responseBody = signatureData.rows.map(sigData => ({
            ...sigData,
            products: products.rows.map(prod => prod.name)
        }))
        console.log(responseBody)
        return res.send(responseBody)
    } catch(e) {
        console.error("GET signature FAILURE")
        console.error(e)
        res.sendStatus(500)
    }
}