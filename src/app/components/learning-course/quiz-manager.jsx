"use client";
import React, { useState } from "react";
import QuestionCard from "./question-card";
import Modal from "./modal";
import confetti from "canvas-confetti";

export default function QuizManager({
  onTryAgain,
  questions,
  userId,
  levelId,
  updateUserProgress,
  sectionId,
  unlockNextSection,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const totalQuestions = questions.length;

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setUserAnswers([]);
    setShowResults(false);
    onTryAgain();
  };
  function runConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  const handleAnswerSelected = async (selectedAnswer) => {
    if (isAnswering) return;

    setIsAnswering(true);

    const answerKey = {
      [questions[currentQuestionIndex].option_a]: "A",
      [questions[currentQuestionIndex].option_b]: "B",
      [questions[currentQuestionIndex].option_c]: "C",
    };

    const selectedAnswerKey = answerKey[selectedAnswer];
    const isCorrect =
      questions[currentQuestionIndex].correct_answers.includes(
        selectedAnswerKey
      );

    let newCorrectAnswers = correctAnswers;
    if (isCorrect) {
      newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { answer: selectedAnswer, isCorrect },
    ]);

    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswering(false);
      }, 1000);
    } else {
      setShowResults(true);
      const passed = newCorrectAnswers >= 4;

      // Call the server action directly if it's provided
      if (updateUserProgress && passed) {
        console.log(
          levelId + (sectionId === 3 ? 1 : 0),
          sectionId === 3 ? 1 : sectionId + 1
        );
        try {
          await updateUserProgress(
            levelId + (sectionId === 3 ? 1 : 0),
            sectionId === 3 ? 1 : sectionId + 1
          );
        } catch (error) {
          console.error("Failed to update user progress:", error);
        }
        runConfetti();
        unlockNextSection(
          levelId + (sectionId === 3 ? 1 : 0),
          sectionId === 3 ? 1 : sectionId + 1
        );
      }
      console.log("Quiz Finished", userAnswers);
      setShowResults(true);
    }
  };

  if (
    !questions ||
    typeof questions === "undefined" ||
    questions.length === 0 ||
    currentQuestionIndex >= questions.length
  ) {
    return <div>Loading questions or no questions found...</div>;
  }

  console.log(questions)
  const correctAnswerTexts = questions[
    currentQuestionIndex
  ].correct_answers.map((answerKey) => {
    switch (answerKey) {
      case "A":
        return questions[currentQuestionIndex].option_a;
      case "B":
        return questions[currentQuestionIndex].option_b;
      case "C":
        return questions[currentQuestionIndex].option_c;
      default:
        return null;
    }
  });

  return (
    <div>
      <QuestionCard
        key={"question-card-" + levelId + "-" + sectionId}
        question={questions[currentQuestionIndex].question_text}
        answers={[
          questions[currentQuestionIndex].option_a,
          questions[currentQuestionIndex].option_b,
          questions[currentQuestionIndex].option_c,
        ]}
        correctAnswer={correctAnswerTexts}
        onAnswerSelected={handleAnswerSelected}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        isAnswering={isAnswering}
      />
      {showResults && (
        <Modal
          key={"modal" + levelId + "-" + sectionId}
          isOpen={showResults}
          onClose={() => setShowResults(false)}
          onTryAgain={resetQuiz}
        >
          <h2>Quiz Results</h2>
          {userAnswers.map((answer, index) => (
            <p key={index}>
              Question {index + 1}:
              {answer.isCorrect ? "\tCorrect" : "\tIncorrect"}
            </p>
          ))}
        </Modal>
      )}
    </div>
  );
}
