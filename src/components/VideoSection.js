import "./VideoSection.css";
import { useState } from "react";

function VideoSection({ onClose }) {
  const [confusedText, setConfusedText] = useState("");

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
        <div className="text-end">
          <button type="button" className="btn btn-danger confused-btn">
            Confused
          </button>
        </div>
      </div>
    </>
  );
}

export default VideoSection;
