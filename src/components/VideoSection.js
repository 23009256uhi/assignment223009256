import "./VideoSection.css";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import FAQSection from "./FAQSection";

function VideoSection({ onClose, videoId }) {
  const [showInput, setShowInput] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [confusedText, setConfusedText] = useState("");

  async function handleConfusedClick() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const db = getFirestore();
        const messagesCollection = collection(db, "Messages");
        const q = query(
          messagesCollection,
          where("userId", "==", userId),
          where("videoId", "==", videoId),
          where("replied", "==", false)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setShowInput(true);
        } else {
          alert(
            "You already have a pending message for this video. Please wait for the admin to reply before sending another message."
          );
        }
      }
    } catch (error) {
      console.error("Error checking unreplied messages", error);
    }
  }

  async function handleSendClick() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const db = getFirestore();
        const messagesCollection = collection(db, "Messages");

        // Create a new message object
        const newMessage = {
          userId: userId,
          videoId: videoId,
          text: confusedText,
          timestamp: serverTimestamp(),
          replied: false,
        };

        // Add the new message to the "messages" collection
        await addDoc(messagesCollection, newMessage);

        setMessageSent(true);
        setConfusedText("");
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  }

  function handleCancelClick() {
    setConfusedText("");
    setShowInput(false);
  }

  return (
    // <>
    //   <div className="overlay-div" />
    //   <div className="video-container container-sm">
    //     <button
    //       type="button"
    //       className="btn-close"
    //       aria-label="Close"
    //       onClick={onClose}
    //     ></button>
    //     {!messageSent && (
    //       <>
    //         <div className="video-placeholder" />
    //         {!showInput && (
    //           <div className="text-end">
    //             <button
    //               type="button"
    //               className="btn btn-danger confused-btn"
    //               onClick={handleConfusedClick}
    //             >
    //               Confused
    //             </button>
    //           </div>
    //         )}
    //         {showInput && (
    //           <div className="confused-form">
    //             <h4>What have you found confusing about this video?</h4>
    //             <textarea
    //               className="form-control"
    //               rows="3"
    //               value={confusedText}
    //               onChange={(e) => setConfusedText(e.target.value)}
    //             ></textarea>
    //             <div className="button-group">
    //               <button
    //                 type="button"
    //                 className="btn btn-primary"
    //                 onClick={handleSendClick}
    //               >
    //                 Send
    //               </button>
    //               <button
    //                 type="button"
    //                 className="btn btn-secondary"
    //                 onClick={handleCancelClick}
    //               >
    //                 Cancel
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </>
    //     )}
    //     {messageSent && (
    //       <div className="message-sent">
    //         <p>
    //           Your message was sent, and you will get a reply within 3 days.
    //         </p>
    //       </div>
    //     )}
    //   </div>
    // </>

    <>
      <div className="overlay-div" />
      <div className="video-container container-sm">
        <div className="row">
          <div className="col-md-4">
            <FAQSection videoId={videoId} />
          </div>
          <div className="col-md-8">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
            {!messageSent && (
              <>
                <div className="video-placeholder" />
                {!showInput && (
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-danger confused-btn"
                      onClick={handleConfusedClick}
                    >
                      Confused
                    </button>
                  </div>
                )}
                {showInput && (
                  <div className="confused-form">
                    <h4>What have you found confusing about this video?</h4>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={confusedText}
                      onChange={(e) => setConfusedText(e.target.value)}
                    ></textarea>
                    <div className="button-group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSendClick}
                      >
                        Send
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {messageSent && (
              <div className="message-sent">
                <p>
                  Your message was sent, and you will get a reply within 3 days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoSection;
