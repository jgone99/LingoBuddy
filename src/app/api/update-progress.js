import { query } from "../db/queries";

export default async function handler(req, res) {
  const { userId, levelId, score, passed } = req.body;

  try {
    await query(
      "UPDATE user_section_progress SET level_id = $1, score = $2, passed = $3 WHERE user_id = $4",
      [levelId, score, passed, userId]
    );

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
