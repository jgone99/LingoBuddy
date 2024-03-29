'use server'

import { Pool } from "pg"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 3
})

export const mutate = async (text, params) => {
    const client = await pool.connect()
    const res = await client.query(text, params)
    client.release()
}