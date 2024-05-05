import QuestionSection from "../components/QuestionSection";
import HintsSection from "../components/HintsSection";
import AnswerSection from "../components/AnswerSection";
import MessageBox from "../components/MessageBox";
import { isAdmin } from "../utils/adminUtils";
import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "./QuestionPage.css";

function QuestionPage({ user }) {
  const isUserAdmin = isAdmin(user || {});
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const messagesRef = collection(db, "Messages");
    if (isUserAdmin) {
      const q = query(messagesRef, where("replied", "in", [false, true]));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      });

      return () => unsubscribe();
    } else {
      const userQuery = query(
        messagesRef,
        where("userId", "==", user.uid),
        where("replied", "==", true)
      );
      const unsubscribe = onSnapshot(userQuery, (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
        console.log(messageData);
      });
      return () => unsubscribe();
    }
  }, [isUserAdmin, user]);

  function handleMessageIconClick(message) {
    if (selectedMessage) {
      setSelectedMessage(null);
    } else {
      setSelectedMessage(message);
    }
  }

  return (
    <div className="container">
      <div className="header d-flex justify-content-end align-items-center p-3">
        <h1 className="text-center header-title mb-0">Question Page</h1>
        <div className="user-icons-container">
          {messages && (
            <div className="user-icons d-flex align-items-center">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="user-icon d-flex align-items-center justify-content-center ml-3"
                  onClick={() => handleMessageIconClick(message)}
                >
                  M
                </div>
              ))}
            </div>
          )}
          {selectedMessage && (
            <MessageBox
              selectedMessage={selectedMessage}
              user={user}
              handleMessageIconClick={handleMessageIconClick}
              isUserAdmin={isUserAdmin}
            />
          )}
        </div>
      </div>
      <div className="row">
        <QuestionSection />
        <HintsSection />
      </div>
      <div className="row">
        <AnswerSection />
      </div>
    </div>
  );
}

export default QuestionPage;
