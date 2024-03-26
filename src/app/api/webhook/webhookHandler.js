const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log("Webhook handler loaded");
console.log("im standin on business");
// Function to handle user creation webhook event and insert user data into the database
export function handleUserCreationEvent(userID) {
  const { id } = userID.data;
  console.log("id", id);
  
  // Insert user data into the database'
  console.log(`User created with ID: ${userID}`);
  insertUserDataIntoDatabase(id);
}

async function insertUserDataIntoDatabase(id) {
  console.log(`User data inserted into the database: ${id}`);
  try {
    const query =
      "INSERT INTO user_section_progress (user_id) VALUES (1$)";
      "INSERT INTO games_progress (user_id) VALUES (1$)";
      "INSERT INTO learning_progress (user_id) VALUES (1$)";

    const values = [id];

    await pool.query(query, values);
  } catch (error) {
    console.error("Error inserting user data into the database sumthin broke:", error);
    consol.log("im done standin on business somthing broke");

  }
}
module.exports = { insertUserDataIntoDatabase };
