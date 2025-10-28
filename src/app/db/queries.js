
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3
})

export const query = async (text, params) => {
    const client = await pool.connect()
    const res = await client.query(text, params)
    client.release()
    return res.rows
}