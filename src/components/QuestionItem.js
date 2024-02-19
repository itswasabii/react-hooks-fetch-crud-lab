import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedAnswer(selectedIndex);
    onUpdateCorrectIndex(id, selectedIndex);
  };

  const handleDeleteClick = () => {
    onDeleteQuestion(id);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedAnswer} onChange={handleSelectChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
