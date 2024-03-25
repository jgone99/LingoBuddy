const AnswerButton = ({
  answerText,
  onSelectAnswer,
  isCorrect,
  isSelected,
  disabled, // New prop
}) => {
  const handleClick = () => {
    onSelectAnswer(answerText);
  };

  const buttonStyle = `block w-full text-left p-4 border rounded ${
    isSelected
      ? isCorrect
        ? "bg-green-500"
        : "bg-red-500"
      : "hover:bg-blue-100"
  }`;

  return (
    <button
      onClick={handleClick}
      className={buttonStyle}
      disabled={disabled || isSelected}
    >
      {answerText}
    </button>
  );
};

export default AnswerButton;
