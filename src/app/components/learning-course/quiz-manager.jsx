"use client";
import React, { useState } from "react";
import QuestionCard from "./question-card";
import Modal from "./modal";
import axios from "axios";

export default function QuizManager({ questions, userId, levelId }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const totalQuestions = questions.length;

  // QuizManager component

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

    if (isCorrect) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { answer: selectedAnswer, isCorrect },
    ]);

    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswering(false); // Set isAnswering to false after currentQuestionIndex is incremented
      }, 1000); // 1 second delay
    } else {
      if (correctAnswers >= 4) {
        console.log("Section Passed");
        try {
          const response = await axios.post("/api/update-progress", {
            userId: userId,
            levelId: levelId,
            sectionId: sectionId, // This should be provided to QuizManager as a prop
            score: correctAnswers,
            passed: correctAnswers >= 4,
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Section Failed");
        // Update user progress here
        try {
          const response = await axios.post("/api/update-progress", {
            userId: "your-user-id", // replace with actual user id
            levelId: "your-level-id", // replace with actual level id
            score: correctAnswers,
            passed: false,
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      console.log("Quiz Finished", userAnswers);
      setShowResults(true);
      // change the state to show results
    }
  };

  console.log(questions);
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

  // Render the question card for the current question
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
