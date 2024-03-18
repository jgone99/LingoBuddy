import React, { useState } from "react";
import ProgressBar from "./progressBar";
const QuestionCard = ({
  question,
  answers,
  correctAnswer,
  onAnswerSelected,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswerSelected(answer === correctAnswer);
  };

  const getAnswerClassNames = (answer) => {
    if (!isAnswered) return "bg-gray-200 text-gray-700 hover:bg-gray-300";
    if (answer === correctAnswer) return "bg-green-500 text-white";
    if (answer === selectedAnswer) return "bg-red-500 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <ProgressBar
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
      />
      <h2 className="block text-gray-700 text-xl font-bold mb-2">{question}</h2>
      <div className="mt-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`font-semibold py-2 px-4 border border-gray-400 rounded shadow ${getAnswerClassNames(
              answer
            )}`}
            disabled={isAnswered}
          >
            {answer}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div
          className={`text-lg mt-4 font-semibold ${
            selectedAnswer === correctAnswer ? "text-green-500" : "text-red-500"
          }`}
        >
          {selectedAnswer === correctAnswer ? "Correct!" : "Incorrect"}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
