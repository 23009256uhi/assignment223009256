import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

function AnswerSection() {
  const [answers, setAnswers] = useState([]);

  async function getAnswers() {
    const questionId = "balances";

    const docRef = doc(db, "Questions", questionId);
    const snapshot = await getDoc(docRef);
    const answersData = snapshot.data();
    const answersDetails =
      answersData.balances.balances.questions.fullquestion.answers;
    setAnswers(answersDetails);
  }

  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <div className="col-12">
      <h3 className="text-center">Answers</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">
          {answers.map((answer, index) => (
            <div key={index} className="col-sm d-grid gap-2">
              <button type="button" className="btn btn-secondary mb-2 p-4">
                {answer.text}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-sm text-center">
          <button type="button" className="btn btn-primary p-4">
            CHECK MY ANSWER
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnswerSection;
