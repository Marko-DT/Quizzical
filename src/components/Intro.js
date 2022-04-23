import React, { useState, useEffect } from "react";

export default function Intro({ quiz, setQuiz, handleClick }) {
  const [cates, setCates] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCates(data.trivia_categories));
  }, []);
  useEffect(() => {
    if (cates.length) {
      setQuiz((prevQuiz) => ({ ...prevQuiz, category: cates[0].id }));
    }
  }, [cates]);
  const onCatSelection = (event) => {
    setQuiz((prevQuiz) => ({ ...prevQuiz, category: event.target.value }));
  };
  return (
    <div className="intro--main">
      <h4 className="intro--title">Quizzical</h4>
      <p className="intro--desc">lurem ipsume description</p>
      <label htmlFor="category">Pick a Category:</label>
      <select
        name="category"
        value={quiz.category}
        onChange={onCatSelection}
        className="intro--select"
      >
        {cates.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="intro--button" onClick={handleClick}>
        Start quiz
      </button>
    </div>
  );
}
