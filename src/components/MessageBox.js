import { onSnapshot } from "firebase/firestore";
import "./MessageBox.css";
import { useEffect, useState } from "react";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ADMIN_UID } from "../utils/adminUtils";

function MessageBox({
  selectedMessage,
  user,
  handleMessageIconClick,
  isUserAdmin,
}) {
  const storage = getStorage();
  const [replies, setReplies] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyImage, setReplyImage] = useState(null);

  function handleReplyMessageChange(event) {
    setReplyMessage(event.target.value);
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    setReplyImage(file);
  }

  // UNCOMMENT TO AVOID REPLIESREF REPETITION
  // const repliesRef = selectedMessage
  // ? collection(db, "Messages", selectedMessage.id, "replies")
  // : null;

  useEffect(() => {
    if (selectedMessage) {
      const repliesRef = collection(
        db,
        "Messages",
        selectedMessage.id,
        "replies"
      );
      const unsubscribe = onSnapshot(repliesRef, (snapshot) => {
        const repliesData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
        setReplies(repliesData);
      });

      return () => unsubscribe();
    }
  }, [selectedMessage]);

  // SEND REPLY FUNCTION-------------------------------------------------------------
  async function handleSendReply() {
    if (selectedMessage) {
      const repliesRef = collection(
        db,
        "Messages",
        selectedMessage.id,
        "replies"
      );

      const storageRef = ref(
        storage,
        `Messages/${selectedMessage.id}/${Date.now}`
      );
      if (replyImage) {
        await uploadBytes(storageRef, replyImage);
        const imageUrl = await getDownloadURL(storageRef);
        await addDoc(repliesRef, {
          text: replyMessage,
          author: user.uid,
          timestamp: new Date(),
          imageUrl: imageUrl,
        });
      }

      const messageRef = doc(db, "Messages", selectedMessage.id);
      await updateDoc(messageRef, {
        // replied: !selectedMessage.replied,
        replied: true,
      });

      setReplyMessage("");
      setReplyImage(null);
      handleMessageIconClick(selectedMessage);
    }
  }

  // ADD TO FAQ FUNCTION-------------------------------------------------------------
  async function handleAddToFAQ(reply) {
    if (selectedMessage) {
      const faqsRef = collection(db, "FAQs");
      const faqData = {
        videoId: selectedMessage.videoId,
        answer: reply.text,
      };

      if (reply.imageUrl) {
        faqData.imageUrl = reply.imageUrl;
      }

      await addDoc(faqsRef, faqData);
    }

    alert("Answer added to the FAQs");
  }

  return (
    <div className="message-box d-flex flex-column justify-content-between">
      <div className="d-flex flex-column justify-content-center">
        <p className="reply">{selectedMessage.text}</p>
        {replies &&
          replies.map((reply) => (
            <div
              key={reply.id}
              className={`reply ${
                reply.author === ADMIN_UID ? "admin-reply" : ""
              }`}
            >
              <p>{reply.text}</p>
              {reply.imageUrl && (
                <img
                  src={reply.imageUrl}
                  alt="reply image"
                  className="reply-image"
                />
              )}
              {isUserAdmin && ADMIN_UID === reply.author && (
                <button
                  className="btn btn-light mt-1"
                  onClick={() => handleAddToFAQ(reply)}
                >
                  Add to FAQ's
                </button>
              )}
            </div>
          ))}
        {/* {replies && replies.map((reply) => <p key={reply.id}>{reply.text}</p>)} */}
      </div>
      <div className="message-input-container d-flex align-items-center mt-3">
        <label className="picture-icon">
          &#128247;
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        <input
          type="text"
          placeholder="Type your reply..."
          value={replyMessage}
          onChange={handleReplyMessageChange}
          className="form-control flex-grow-1"
        />

        <button onClick={handleSendReply} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageBox;
