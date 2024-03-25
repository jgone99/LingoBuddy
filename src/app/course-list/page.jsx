import React from "react";
import { query } from "../db/queries";
import LevelCard from "../components/learning-course/level-card";

export default async function CourseListPage() {
  const fetchLevelQuestions = async (levelId) => {
    const res = await query(
      "SELECT section_id, section_text, question_text, option_a, option_b, option_c, correct_answers FROM level_questions WHERE level_id = $1 ORDER BY section_id, question_id",
      [levelId]
    );
    return res.map((q) => ({
      section_id: q.section_id,
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
      section_id: a.section_id,
      section_text: a.section_text,
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
                title={section}
                questions={questions}
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
