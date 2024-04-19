import React from "react";

const TryAgainButton = ({ onTryAgain }) => {
  return (
    <button
      onClick={onTryAgain}
      className="py-2 px-4 mt-4 rounded bg-green-500 text-white hover:bg-green-700 transition duration-300"
    >
      Try Again
    </button>
  );
};

export default TryAgainButton; 