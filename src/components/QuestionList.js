import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectIndex }) {
  const handleDeleteClick = async (id) => {
    try {
      
      await onDeleteQuestion(id);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCorrectIndexChange = async (id, correctIndex) => {
    try {
      
      await onUpdateCorrectIndex(id, correctIndex);
    } catch (error) {
      console.error("Error updating correctIndex:", error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>
              <p>{question.prompt}</p>
              <label>
                Correct Answer:
                <select
                  value={question.correctIndex}
                  onChange={(e) =>
                    handleCorrectIndexChange(
                      question.id,
                      parseInt(e.target.value, 10)
                    )
                  }
                >
                  {question.answers.map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => handleDeleteClick(question.id)}>
                Delete Question
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
