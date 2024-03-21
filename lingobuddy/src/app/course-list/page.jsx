import React from "react";
import { query } from "../db/queries";
import QuizManager from "../components/learning-course/quiz-manager";

export default function CourseListPage() {
  // Server-side fetch for the checkpoint questions
  const fetchQuestions = async () => {
    const res = await query(
      "SELECT * FROM checkpoint_questions WHERE level_id = $1 ORDER BY question_id",
      [levelId]
    );
    console.log(res);
  };

  const questions = fetchQuestions();

  return (
    <div>
      <QuizManager questions={questions} />
    </div>
  );
}
