"use client";
import React, { useState } from "react";
import QuizManager from "./quiz-manager";

function LevelCard({
  levelId,
  questions,
  title,
  score,
  userId,
  updateUserProgress,
}) {
  const [startQuiz, setStartQuiz] = useState(false);
  console.log("Score:", score);

  const isDisabled = levelId > 1 && score < 4;

  const handleStartClick = () => {
    if (!isDisabled) {
      setStartQuiz(true);
    }
  };
  console.log("Is Disabled:", isDisabled);

  console.log(title);
  return (
    <div
      className={`border border-gray-300 rounded p-4 mb-4 shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${
        isDisabled ? "bg-gray-200" : ""
      }`}
    >
      <h2 className="text-2xl mb-4">
        {title ? title : `Checkpoint ${levelId}`}
      </h2>
      {startQuiz ? (
        <QuizManager
          questions={questions}
          userId={userId}
          levelId={levelId}
          updateUserProgress={updateUserProgress}
        />
      ) : (
        <button
          onClick={handleStartClick}
          disabled={isDisabled}
          className={`py-2 px-4 rounded cursor-pointer ${
            isDisabled
              ? "bg-gray-500"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
        >
          Start
        </button>
      )}
    </div>
  );
}
export default LevelCard;
