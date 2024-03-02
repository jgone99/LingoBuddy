import { query } from '../../db.js';

export default async function handler(req, res) {
    try {
      const { rows } = await query('SELECT NOW()', []);
      res.status(200).json({ success: true, timestamp: rows[0].now });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
  