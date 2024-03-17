import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import AnswerButton from "./AnswerButton";

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

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <ProgressBar
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalQuestions}
      />
      <h2 className="block text-gray-700 text-xl font-bold mb-2">{question}</h2>
      <div className="mt-4">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            answerText={answer}
            onSelectAnswer={handleAnswerClick}
            isCorrect={answer === correctAnswer}
            isSelected={answer === selectedAnswer}
          />
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
