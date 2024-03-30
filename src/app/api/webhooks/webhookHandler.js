	import { mutate } from '../../db/mutations'

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
			await mutate('BEGIN')
			const insertCourseProgress = 'INSERT INTO course_progress VALUES ($1, $2, $3)'
			await mutate(insertCourseProgress, [id, 1, 1]);
			const insertGamesProgress = 'INSERT INTO games_progress VALUES ($1, $2, $3)'
			await mutate(insertGamesProgress, [id, 0, 0]);
			await mutate('COMMIT')
		} catch (error) {
			console.error("Error inserting user data into the database sumthin broke:", error);
			consol.log("im done standin on business somthing broke");

		}
	}
	export { insertUserDataIntoDatabase };
