import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

function QuestionSection() {
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageUri, setImageUri] = useState("");
  const questionId = "balances";

  async function getQuestions() {
    const docRef = doc(db, "Questions", questionId);
    const snapshot = await getDoc(docRef);
    const questionData = snapshot.data();
    const questionDetails = questionData[questionId];
    setTitle(questionDetails[questionId].questions.title);
    setQuestionText(
      questionDetails[questionId].questions.fullquestion.question
    );
    setImageUri(
      questionDetails[questionId].questions.fullquestion.questionImage
    );
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="col-sm">
      <h3 className="text-center">{title}</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="text-center">
          <img className="mb-4 rounded img-fluid" src={imageUri} />
        </div>
        <p>{questionText}</p>
      </div>
    </div>
  );
}

export default QuestionSection;
