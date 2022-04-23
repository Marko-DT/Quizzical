import React from "react";

export default function Answer({
  correct,
  ans,
  id,
  onClick,
  isChecked,
  UserChoise
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`question--answer-btn ${
        ans.isClicked ? "question-answer-clicked" : ""
      } ${
        ans.answer == correct && isChecked
          ? "question-answer-correct"
          : ans.answer === UserChoise && isChecked && UserChoise != correct
          ? "question-answer-wrong"
          : ""
      }`}
    >
      {ans.answer}
    </button>
  );
}
