import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = async (newQuestion) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      setQuestions([...questions, data]);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdateCorrectIndex = async (id, correctIndex) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === id ? { ...q, correctIndex } : q
        )
      );
    } catch (error) {
      console.error("Error updating correctIndex:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectIndex={handleUpdateCorrectIndex}
        />
      )}
    </main>
  );
}

export default App;
