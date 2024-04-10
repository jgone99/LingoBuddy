import React from "react";
import { query } from "../db/queries";
import { mutate } from "../db/mutations";
import LevelCard from "../components/learning-course/level-card";
import { auth } from "@clerk/nextjs";
import CourseListComponent from "../components/learning-course/course-list-component";

const userProgressTableName = 'course_progress'

export default async function CourseListPage() {
	const { userId } = auth();

	async function updateUserProgress(levelId, sectionId) {
		"use server";
		console.log('updating user');
		const updateUserQuery = 
			`UPDATE course_progress
			SET level_id = $2, section_id = $3
			WHERE user_id = $1`;
		await mutate(updateUserQuery, [userId, levelId, sectionId])
	}

	// FOR TESTING
	const resetUserProgress = async() => {
		'use server'
		await query("UPDATE course_progress SET level_id = 1, section_id = 1 WHERE user_id = $1",
		[userId])
	}

	const fetchAllQuestions = async() => {
		const res = await query(
			"SELECT * FROM all_questions ORDER BY level_id, section_id"
		);
		return res
	}

	const fetchUserProgress = async() => {
		'use server'
		const res = await query(
			"SELECT * FROM course_progress WHERE user_id=$1",
			[userId]
		);
		return res[0]
	}

	const userProgress = await fetchUserProgress()

	const allQuestions = await fetchAllQuestions()

	const questionsByLevelAndSection = allQuestions.reduce((groups, question) => {
		const key1 = question.level_id;
		const key2 = question.section_id;
		if (!groups[key1]) {
			groups[key1] = {
				1: [],
				2: [],
				3: [],
			}
		}
		groups[key1][key2].push(question);
		return groups;
	}, {})

	return (
		<>
			{console.log(userProgress)}
			<CourseListComponent 
			initUserProgress={userProgress} 
			fetchUserProgress={fetchUserProgress} 
			questionsByLevelAndSection={questionsByLevelAndSection} 
			updateUserProgress={updateUserProgress}

			// FOR TESTING
			resetUserProgress={resetUserProgress}
			 />
		</>
	);
}
