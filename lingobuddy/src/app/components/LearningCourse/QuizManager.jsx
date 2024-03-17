import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import CloseButton from "./CloseButton";
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
  const [showModal, setShowModal] = useState(false);
  const totalQuestions = levelOneQuestions.length;

  const handleAnswerSelected = (selectedAnswer, isCorrect) => {
    const newUserAnswers = [
      ...userAnswers,
      {
        question: levelOneQuestions[currentQuestionIndex].question,
        selectedAnswer,
        isCorrect,
        correctAnswer: levelOneQuestions[currentQuestionIndex].correctAnswer,
      },
    ];
    setUserAnswers(newUserAnswers);

    // Proceed to next question or end quiz
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {/* Quiz summary or feedback */}
        <p>Quiz Completed! Here's how you did:</p>
        {/* Iterate through userAnswers to show the results */}
        {userAnswers.map((userAnswer, index) => (
          <div key={index}>
            Question {index + 1}: {userAnswer.answer} -{" "}
            {userAnswer.isCorrect ? "Correct" : "Incorrect"}
          </div>
        ))}
        <CloseButton onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default QuizManager;
