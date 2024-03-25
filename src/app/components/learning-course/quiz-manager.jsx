"use client";
import React, { useState } from "react";
import QuestionCard from "./question-card";
import CloseButton from "./close-button";
import Modal from "./modal";

export default function QuizManager({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const totalQuestions = questions.length;

  const handleAnswerSelected = (selectedAnswer) => {
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

    console.log("selectedAnswer:", selectedAnswer);
    console.log("selectedAnswerKey:", selectedAnswerKey);
    console.log("isCorrect:", isCorrect);

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
      console.log("Quiz Finished", userAnswers);
      setShowResults(true);
      // navigate to a results page or change the state to show results
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
        isAnswering={isAnswering} // Pass isAnswering as a prop
      />
      {showResults && (
        <Modal isOpen={showResults} onClose={() => setShowResults(false)}>
          {/* Here you can display the results */}
          <h2>Quiz Results</h2>
          {/* Display the user's answers and whether they were correct */}
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
