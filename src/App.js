import React, { useState } from "react";
import Intro from "./components/Intro";
import Main from "./components/Main";

export default function App() {
  const [isIntro, setIsIntro] = useState(true);
  const [quiz, setQuiz] = useState({
    amount: 5,
    category: ""
  });
  const startQuizClicked = () => {
    setIsIntro(false);
  };
  return isIntro ? (
    <Intro quiz={quiz} setQuiz={setQuiz} handleClick={startQuizClicked} />
  ) : (
    <Main quiz={quiz} setIsIntro={setIsIntro} />
  );
}
