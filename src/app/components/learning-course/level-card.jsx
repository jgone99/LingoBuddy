"use client";
import React, { useState } from "react";
import QuizManager from "./quiz-manager";

function LevelCard({ levelId, questions, title }) {
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartClick = () => {
    setStartQuiz(true);
  };
  console.log(title);
  return (
    <div className="border border-gray-300 rounded p-4 mb-4 shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
      <h2 className="text-2xl mb-4">
        {title ? title : `Checkpoint ${levelId}`}
      </h2>
      {startQuiz ? (
        <QuizManager questions={questions} />
      ) : (
        <button
          onClick={handleStartClick}
          className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-700"
        >
          Start
        </button>
      )}
    </div>
  );
}

export default LevelCard;
