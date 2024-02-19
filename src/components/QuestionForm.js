import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const initialFormData = {
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          answers: [
            formData.answer1,
            formData.answer2,
            formData.answer3,
            formData.answer4,
          ],
          correctIndex: parseInt(formData.correctIndex, 10),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add question");
      }

      const newQuestion = await response.json();
      onAddQuestion(newQuestion);

     
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {[1, 2, 3, 4].map((index) => (
          <label key={index}>
            {`Answer ${index}:`}
            <input
              type="text"
              name={`answer${index}`}
              value={formData[`answer${index}`]}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {[1, 2, 3, 4].map((index) => (
              <option key={index} value={index - 1}>
                {`Answer ${index}`}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
