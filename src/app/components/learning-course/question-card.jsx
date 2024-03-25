"use client";

import React, { useState, useEffect } from "react";
import ProgressBar from "./progress-bar";
import AnswerButton from "./answer-button";

const QuestionCard = ({
  question,
  answers,
  correctAnswer,
  onAnswerSelected,
  currentQuestionIndex,
  totalQuestions,
  isAnswering, // New prop
}) => {
  console.log(correctAnswer);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Reset the selected answer and isAnswered state when the question changes
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (isAnswering) return; // Prevent answer selection while isAnswering is true

    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswerSelected(answer);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <ProgressBar
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
      />
      <h2 className="block text-gray-700 text-xl font-bold mb-2">{question}</h2>
      <div className="mt-4">
        {answers.map((answer, index) => {
          console.log("Answer:", answer);
          console.log("Correct Answer:", correctAnswer);
          console.log("Includes:", correctAnswer.includes(answer));
          return (
            <AnswerButton
              key={index}
              answerText={answer}
              isCorrect={correctAnswer.includes(answer)}
              isSelected={answer === selectedAnswer}
              onSelectAnswer={() => handleAnswerClick(answer)}
              disabled={isAnswering} // Disable the button while isAnswering is true
            />
          );
        })}
      </div>
      {isAnswered && (
        <div
          className={`text-lg mt-4 font-semibold ${
            correctAnswer.includes(selectedAnswer)
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {correctAnswer.includes(selectedAnswer) ? "Correct!" : "Incorrect"}{" "}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
