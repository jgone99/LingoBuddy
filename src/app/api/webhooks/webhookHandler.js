
import { mutate } from '../../db/mutations'
import { query } from '../../db/queries';

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

export async function handleSessionCreationEvent(userID) {
	const { user_id } = userID.data
	console.log(user_id)

	// Check if account id exists in db
	const checkUserTable = `SELECT EXISTS(SELECT * FROM user_accounts WHERE user_id = $1)`
	const exists = (await query(checkUserTable, [user_id]))[0].exists

	// Insert user into progress tables if signed-in and not in tables
	if (!exists) {
		console.log('user in clerk but not in db. adding user to db.')
		await insertUserDataIntoDatabase(user_id)
	}
}

async function insertUserDataIntoDatabase(id) {
	console.log(`User data inserted into the database: ${id}`);
	try {
		await mutate('BEGIN')
		const insertUserAccount = `INSERT INTO user_accounts VALUES ($1)`
		await mutate(insertUserAccount, [id])
		const insertCourseProgress = 'INSERT INTO course_progress VALUES ($1, $2, $3)'
		await mutate(insertCourseProgress, [id, 1, 1]);
		const insertGamesProgress = 'INSERT INTO games_progress VALUES ($1, $2, $3)'
		await mutate(insertGamesProgress, [id, 0, 0]);
		await mutate('COMMIT')
	} catch (error) {
		console.error("Error inserting user data into the database sumthin broke:", error);
		console.log("im done standin on business somthing broke");

	}
}
export { insertUserDataIntoDatabase };
