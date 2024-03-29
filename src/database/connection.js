
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const config ={
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};
const connection = new Pool(config);

export default connection;