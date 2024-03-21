"use client";

import React, { useState } from "react";
import QuestionCard from "./question-card";

export default function QuizManager({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const totalQuestions = questions.length;

  const handleAnswerSelected = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex].correct_answers;
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { answer: selectedAnswer, isCorrect },
    ]);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Quiz Finished", userAnswers);
      // navigate to a results page or change the state to show results
    }
  };

  if (
    !questions ||
    questions.length === 0 ||
    currentQuestionIndex >= questions.length
  ) {
    return <div>Loading questions or no questions found...</div>;
  }

  // Render the question card for the current question
  return (
    <div>
      <QuestionCard
        question={questions[currentQuestionIndex].question_text}
        answers={[
          questions[currentQuestionIndex].option_a,
          questions[currentQuestionIndex].option_b,
          questions[currentQuestionIndex].option_c,
        ]}
        correctAnswer={questions[currentQuestionIndex].correct_answers}
        onAnswerSelected={handleAnswerSelected}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
      {/* Here you would conditionally render the results modal or component based on quiz completion */}
    </div>
  );
}
