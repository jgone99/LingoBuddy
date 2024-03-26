"use client";
import React, { useState } from "react";
import QuestionCard from "./question-card";
import Modal from "./modal";

export default function QuizManager({
  questions,
  userId,
  levelId,
  updateUserProgress,
  sectionId,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const totalQuestions = questions.length;

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
      if (updateUserProgress) {
        try {
          await updateUserProgress({
            userId,
            levelId,
            sectionId: 1,
            score: newCorrectAnswers,
            passed,
          });
        } catch (error) {
          console.error("Failed to update user progress:", error);
        }
      }
      console.log("Quiz Finished", userAnswers);
      setShowResults(true);
    }
  };

  console.log(questions);
  console.log("levelId:", levelId);
  if (
    !questions ||
    typeof questions === "undefined" ||
    questions.length === 0 ||
    currentQuestionIndex >= questions.length
  ) {
    return <div>Loading questions or no questions found...</div>;
  }
  console.log(questions[currentQuestionIndex].correct_answers);

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
        <Modal isOpen={showResults} onClose={() => setShowResults(false)}>
          <h2>Quiz Results</h2>
          {userAnswers.map((answer, index) => (
            <p key={index}>
              Question {index + 1}: {answer.answer} -{" "}
              {answer.isCorrect ? "Correct" : "Incorrect"}
            </p>
          ))}
        </Modal>
      )}
    </div>
  );
}
