import connection from "../../src/database/connection.js";

async function clearAllTables() {
    await connection.query('DELETE FROM orders;')
    await connection.query('DELETE FROM products;')
    await connection.query('DELETE FROM signatures;')
    await connection.query('DELETE FROM deliveries;')
    await connection.query('DELETE FROM plans;')
    await connection.query('DELETE FROM sessions')
    await connection.query('DELETE FROM users')
}

export default clearAllTables;