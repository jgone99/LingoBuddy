import React from "react";
import { query } from "../db/queries";
import LevelCard from "../components/learning-course/level-card";
import { auth } from "@clerk/nextjs";
import CourseListComponent from "../components/learning-course/course-list-component";

export default async function CourseListPage() {
	const { userId } = auth();

	const existingProgress = await query(
		"SELECT * FROM user_section_progress WHERE user_id = $1",
		[userId]
	);

	if (existingProgress.length === 0) {
		await query(
			`INSERT INTO user_section_progress (user_id, level_id, section_id, score, passed)
       VALUES ($1, $2, $3, $4, $5)`,
			[userId, 1, 1, 0, false]
		);
	}
	async function updateUserProgress(levelId, sectionId) {
		"use server";
		console.log(userId, levelId, sectionId);
		await query(
			`UPDATE course_progress
			SET level_id = $2, section_id = $3
			WHERE user_id = $1`,
			[userId, levelId, sectionId]
		);
	}

	const fetchPassedStatus = async (levelId, sectionId) => {
		const res = await query(
			"SELECT passed FROM user_section_progress WHERE user_id = $1 AND level_id = $2 AND section_id = $3",
			[userId, levelId, sectionId]
		);
		return res[0] ? res[0].passed : false;
	};

	const fetchScore = async (levelId) => {
		const res = await query(
			"SELECT score FROM user_section_progress WHERE user_id = $1 AND level_id = $2",
			[userId, levelId]
		);
		return res[0] ? res[0].score : 0;
	};

	// Fetch the user's current level and section
	// const userProgress = await query(
	// 	"SELECT level_id, section_id FROM user_section_progress WHERE user_id = $1",
	// 	[userId]
	// );

	const fetchLevelQuestions = async (levelId) => {
		const res = await query(
			"SELECT section_id, section_text, question_text, option_a, option_b, option_c, correct_answers, (SELECT score FROM user_section_progress WHERE user_id = $2 AND level_id = $1) as score FROM level_questions WHERE level_id = $1 ORDER BY section_id, question_id",
			[levelId, userId]
		);
		return res.map((q) => ({
			sectionId: q.section_id,
			section_text: q.section_text,
			question_text: q.question_text,
			option_a: q.option_a,
			option_b: q.option_b,
			option_c: q.option_c,
			correct_answers: q.correct_answers,
		}));
	};

	const fetchQuestions = async (levelId) => {
		const res = await query(
			"SELECT * FROM checkpoint_questions WHERE level_id = $1 ORDER BY question_id",
			[levelId]
		);
		return res.map((a) => ({
			question_text: a.question_text,
			option_a: a.option_a,
			option_b: a.option_b,
			option_c: a.option_c,
			correct_answers: a.correct_answers,
		}));
	};

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

	const levels = Array.from({ length: 10 }, (_, i) => i + 1);
	const questionsByLevel = await Promise.all(levels.map(fetchLevelQuestions));
	const checkpointQuestions = await Promise.all(levels.map(fetchQuestions));
	const scores = await Promise.all(levels.map(fetchScore));
	const passedStatuses = await Promise.all(
		levels.map((level) => fetchPassedStatus(level, 2))
	);

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

	const groupedQuestions = questionsByLevel.map((levelQuestions) =>
		levelQuestions.reduce((groups, question) => {
			const key = question.section_text;
			if (!groups[key]) {
				groups[key] = [];
			}
			groups[key].push(question);
			return groups;
		}, {})
	);

	return (
		<>
			{console.log(userProgress)}
			<CourseListComponent initUserProgress={userProgress} fetchUserProgress={fetchUserProgress} questionsByLevelAndSection={questionsByLevelAndSection} updateUserProgress={updateUserProgress} />
		</>
	);
}
