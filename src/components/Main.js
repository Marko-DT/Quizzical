import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Main({ quiz, setIsIntro }) {
  const [questions, setQuestions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const scramble = (correct, incorrect) => {
    const shuffleArray = (arr) => {
      return arr.sort(() => Math.random() - 0.5);
    };
    let arry = incorrect;
    arry.push(correct);
    let ar = shuffleArray(arry);
    ar = ar.map((item) => ({ isClicked: false, answer: item }));
    return ar;
  };

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${quiz.amount}&category=${quiz.category}`
    )
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((res) => ({
            id: nanoid(),
            question: res.question,
            answers: scramble(res.correct_answer, res.incorrect_answers),
            correct: res.correct_answer,
            UserChoise: "",
            isCorrect: false
          }))
        )
      );
  }, []);
  const mainBtn = () => {
    isChecked ? setIsIntro(true) : setIsChecked(true);
  };

  const answerClicked = (event, Qid) => {
    const ansId = event.target.id;
    setQuestions((prevQ) =>
      prevQ.map((q) =>
        q.id === Qid
          ? {
              ...q,
              UserChoise: q.answers[ansId].answer,
              answers: q.answers.map((a, i) =>
                i == ansId ? { ...a, isClicked: !a.isClicked } : { ...a }
              )
            }
          : { ...q }
      )
    );
  };
  const countCorrect = () => {
    let count = 0;
    questions.forEach((q) => {
      q.UserChoise === q.correct ? ++count : "";
    });
    return count;
  };
  return (
    <div className="main--main">
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          answerClicked={answerClicked}
          isChecked={isChecked}
        />
      ))}
      {isChecked && (
        <p className="main--results">{`You Scored ${countCorrect()}/${
          quiz.amount
        } correct answers`}</p>
      )}
      <button className="main--button" onClick={mainBtn}>
        {isChecked ? "Play again" : "Check answers"}
      </button>
    </div>
  );
}
