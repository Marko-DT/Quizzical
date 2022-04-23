import React from "react";
import { nanoid } from "nanoid";
import Answer from "./Answer";
export default function Question({ question, answerClicked, isChecked }) {
  return (
    <div className="question--wrapper">
      <h4
        className="question--title"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h4>
      <div className="question-answer-wrapper">
        {question.answers.length &&
          question.answers.map((ans, i) => (
            <Answer
              key={nanoid()}
              id={i}
              onClick={() => answerClicked(event, question.id)}
              ans={ans}
              correct={question.correct}
              isChecked={isChecked}
              UserChoise={question.UserChoise}
            />
          ))}
      </div>
      <hr className="question--divider" />
    </div>
  );
}
