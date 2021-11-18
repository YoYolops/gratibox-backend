import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/connection.js";
import { userSchema, loginSchema } from "../database/schemas.js";


export async function login(req, res) {
    if(loginSchema.validate(req.body).error) return res.sendStatus(422)
    const { email, password } = req.body

    try {
        const dbResponse = await connection.query('SELECT * FROM users WHERE email = $1;', [email])
        if(!dbResponse.rows.length) return res.sendStatus(404);

        const user = dbResponse.rows[0]
        if(!bcrypt.compareSync(password, user.password)) return res.sendStatus(403);
        delete user.password

        const newToken = uuid()

        await connection.query(
            'UPDATE sessions SET is_expired = TRUE WHERE user_id = $1 AND is_expired = FALSE; INSERT INTO sessions (token, user_id) VALUES ($2, $1)',
            [ user.id, newToken ]
        )

        user.token = token
        return res.status(200).send(user)
    } catch(e) {
        console.error("LOGIN FAILURE")
        console.error(e)
        res.sendStatus(500)
    }
}


export async function register(req, res) {
    if(userSchema.validate(req.body).error) return res.sendStatus(422)
    const { name, email, password } = req.body

    try {
        const hashPassword = bcrypt.hash(password, 10)
        const isEmailAlreadyRegistered = connection.query(
            'SELECT * FROM users WHERE email = $1;',
            [ email ]
        )
    
        const [ resHashPassword, resIsEmailAlreadyRegistered ] = await Promise.all([
            hashPassword,
            isEmailAlreadyRegistered
        ])
        if(resIsEmailAlreadyRegistered.rows.length) return res.sendStatus(409)
    
        await connection.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
            [ name, email, resHashPassword ]
        )
    
        return res.sendStatus(201)
    } catch(e) {
        console.error("REGISTER FAILURE")
        console.error(e)
        res.sendStatus(500)
    }
}