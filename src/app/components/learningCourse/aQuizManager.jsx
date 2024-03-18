import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";

const levelOneQuestions = [
  {
    id: 1,
    question: "¿Cómo te llamas? (What is your name?)",
    answers: [
      "A) Me llamo [Your Name].",
      "B) Tengo [Your Age] años.",
      "C) Soy de [Your Country].",
    ],
    correctAnswer: "A) Me llamo [Your Name].",
  },
  {
    id: 2,
    question: "¿De dónde eres? (Where are you from?)",
    answers: [
      "A) Soy de [City, Country].",
      "B) Vivo en [City, Country].",
      "C) Me gusta [City, Country].",
    ],
    correctAnswer: "A) Soy de [City, Country].",
  },
];

const QuizManager = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const totalQuestions = levelOneQuestions.length;

  const handleAnswerSelected = (answer) => {
    const newUserAnswers = [...userAnswers, answer];
    setUserAnswers(newUserAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Quiz completed", newUserAnswers);
    }
  };

  return (
    <div>
      <QuestionCard
        question={levelOneQuestions[currentQuestionIndex].question}
        answers={levelOneQuestions[currentQuestionIndex].answers}
        correctAnswer={levelOneQuestions[currentQuestionIndex].correctAnswer}
        onAnswerSelected={handleAnswerSelected}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default QuizManager;
