import "./VideoSection.css";
import { useState } from "react";
import { getAuth } from "firebase/auth";

function VideoSection({ onClose, videoId }) {
  const [showInput, setShowInput] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [confusedText, setConfusedText] = useState("");

  function handleConfusedClick() {
    setShowInput(true);
  }

  async function handleSendClick() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;

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
    <>
      <div className="overlay-div" />
      <div className="video-container container-sm">
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
    </>
  );
}

export default VideoSection;
