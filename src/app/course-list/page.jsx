import React from "react";
import { query } from "../db/queries";
import LevelCard from "../components/learning-course/level-card";
import { auth } from "@clerk/nextjs";

async function updateUserProgress(userId, levelId, sectionId, score, passed) {
  "use server";
  console.log(userId, levelId, sectionId);
  await query(
    `UPDATE user_section_progress
     SET score = $4, passed = $5
     WHERE user_id = $1 AND level_id = $2 AND section_id = $3`,
    [userId, levelId, sectionId, score, passed]
  );
}
export async function action({ request }) {
  "use server";
  const { userId, levelId, sectionId, score, passed } = await request.json();
  console.log(userId, levelId, sectionId); // Add this line

  if (!userId || !levelId || !sectionId || score === null || passed === null) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Missing or null parameter",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    await updateUserProgress(userId, levelId, sectionId, score, passed);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

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

  const fetchScore = async (levelId) => {
    const res = await query(
      "SELECT score FROM user_section_progress WHERE user_id = $1 AND level_id = $2",
      [userId, levelId]
    );
    return res[0] ? res[0].score : 0;
  };

  // Fetch the user's current level and section
  const userProgress = await query(
    "SELECT level_id, section_id FROM user_section_progress WHERE user_id = $1",
    [userId]
  );

  const fetchLevelQuestions = async (levelId) => {
    const res = await query(
      "SELECT section_id, section_text, question_text, option_a, option_b, option_c, correct_answers, (SELECT score FROM user_section_progress WHERE user_id = $2 AND level_id = $1) as score FROM level_questions WHERE level_id = $1 ORDER BY section_id, question_id",
      [levelId, userId]
    );
    return res.map((q) => ({
      section_id: q.section_id,
      section_text: q.section_text,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      correct_answers: q.correct_answers,
      sectionId: q.section_id,
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

  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  const levelQuestions_one = await Promise.all(levels.map(fetchLevelQuestions));
  const questions = await Promise.all(levels.map(fetchQuestions));
  const scores = await Promise.all(levels.map(fetchScore));

  const groupedQuestions = levelQuestions_one.map((levelQuestions) =>
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
    <div>
      {levels.map((level, index) => (
        <React.Fragment key={index}>
          {Object.entries(groupedQuestions[index]).map(
            ([section, questions], sectionIndex) => (
              <LevelCard
                key={sectionIndex}
                levelId={level}
                sectionId={questions[0].sectionId}
                title={section}
                questions={questions}
                score={scores[index]}
                userId={userId}
                updateUserProgress={updateUserProgress}
              />
            )
          )}
          <LevelCard
            key={index + 10}
            levelId={level}
            title={`Checkpoint Level ${level}`}
            questions={questions[index]}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
