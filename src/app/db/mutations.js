'use server'

import { Pool } from "pg"

let pool

if (!global.__pgPool) {
  global.__pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      ssl: {
      rejectUnauthorized: false,
    },
  })
}

pool = global.__pgPool

export const mutate = async (text, params) => {
    const res = await pool.query(text, params)
    return res.rows
}