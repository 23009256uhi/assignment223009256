import "./VideoSection.css";
import { useState } from "react";

function VideoSection({ onClose }) {
  const [showInput, setShowInput] = useState(false);
  const [confusedText, setConfusedText] = useState("");

  function handleConfusedClick() {
    setShowInput(true);
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
                onClick={handleConfusedClick}
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
      </div>
    </>
  );
}

export default VideoSection;
