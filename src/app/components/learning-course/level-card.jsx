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
  sectionId,
<<<<<<< HEAD
  passed,
  isLastSection,
  hasPassedSectionTwo,
  isCheckpoint,
=======
  isDisabled,
  unlockNextSection,
  isPending
>>>>>>> 59017e290c0f54f5dc50e7a0a7212735d30bbc65
}) {
  const [startQuiz, setStartQuiz] = useState(false);
  console.log("Score:", score);

  const isDisabled = isCheckpoint
    ? !hasPassedSectionTwo
    : !(levelId === 1 && sectionId === 1) && !(isLastSection && passed);

  const handleStartClick = () => {
    if (!isDisabled) {
      setStartQuiz(true);
    }
  };
<<<<<<< HEAD
  console.log("Is Disabled:", isDisabled);

  console.log(title);
  console.log("levelId:", levelId);
  console.log("sectionId:", sectionId);
  console.log("isLastSection:", isLastSection);
  console.log("passed:", passed);
=======

  // console.log(title);
  // console.log("levelId:", levelId);
  // console.log("sectionId:", sectionId);
  // console.log("isLastSection:", isLastSection);
  // console.log("passed:", passed);
>>>>>>> 59017e290c0f54f5dc50e7a0a7212735d30bbc65
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
<<<<<<< HEAD
=======
          key={'qmanager-'+levelId+'-'+sectionId}
>>>>>>> 59017e290c0f54f5dc50e7a0a7212735d30bbc65
          questions={questions}
          userId={userId}
          levelId={levelId}
          sectionId={sectionId}
          updateUserProgress={updateUserProgress}
<<<<<<< HEAD
=======
          unlockNextSection={unlockNextSection}
>>>>>>> 59017e290c0f54f5dc50e7a0a7212735d30bbc65
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
          {isPending ? 'Pending' : 'Start'}
        </button>
      )}
    </div>
  );
}
export default LevelCard;
