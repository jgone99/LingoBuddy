
import { clerkClient } from '@clerk/nextjs/server';
import { mutate } from '../../db/mutations'
import { query } from '../../db/queries';

console.log("Webhook handler loaded");
console.log("im standin on business");
// Function to handle user creation webhook event and insert user data into the database
export function handleUserCreationEvent(payload) {
	const { id, first_name, username, last_name } = payload.data;
	const email_address = payload.data.email_addresses[0].email_address

	console.log("id", id);

	// Insert user data into the database'
	console.log(`User created with ID: ${id}`);
	insertUserDataIntoDatabase(id, username, first_name, last_name, email_address);
}

export async function handleSessionCreationEvent(payload) {
	const { user_id } = payload.data
	// Check if account id exists in db
	const checkUserTable = `SELECT EXISTS(SELECT * FROM user_accounts WHERE user_id = $1)`
	const exists = (await query(checkUserTable, [user_id]))[0].exists

	// Insert user into progress tables if signed-in and not in tables
	if (!exists) {
		const user = await clerkClient.users.getUser(user_id)
		const { username, firstName, lastName } = user;
		const email_address = user.emailAddresses[0].emailAddress
		console.log('user in clerk but not in db. adding user to db.')
		await insertUserDataIntoDatabase(user_id, username, firstName, lastName, email_address)
	}
}

async function insertUserDataIntoDatabase(id, username, first_name, last_name, email_address) {
	console.log(`User data inserted into the database: ${id}`);
	try {
		await mutate('BEGIN')
		const insertUserAccount = `INSERT INTO user_accounts VALUES ($1, $2, $3, $4, $5)`
		await mutate(insertUserAccount, [id, username, first_name, last_name, email_address])
		const insertProgress = 'INSERT INTO progress VALUES ($1, $2, $3, $4, $5)'
		await mutate(insertProgress, [id, 1, 1, 0, 0]);
		await mutate('COMMIT')
	} catch (error) {
		console.error("Error inserting user data into the database sumthin broke:", error);
		console.log("im done standin on business somthing broke");

	}
}
