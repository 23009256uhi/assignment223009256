import { useState, useEffect } from "react";
import VideoSection from "./VideoSection";

function HintsSection() {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showVideo]);

  function handleVideoClick(videoId) {
    setShowVideo(true);
    setSelectedVideoId(videoId);
  }

  function handleCloseVideo() {
    setShowVideo(false);
  }

  return (
    <div className="col-sm">
      <h3 className="text-center">Hints</h3>
      <div className="mb-2 bg-light">
        <div className="row">
          <div className="col-6 text-center">
            <p>General</p>
            <div className="mb-5 d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary mb-1 p-2"
                onClick={() => handleVideoClick("video1id")}
              >
                Video
              </button>
              <button type="button" className="btn btn-primary mb-1 p-2">
                Summary
              </button>
            </div>

            <div className="mb-5 d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary mb-1 p-2"
                onClick={() => handleVideoClick("video2id")}
              >
                Video
              </button>
              <button type="button" className="btn btn-primary mb-1 p-2">
                Summary
              </button>
            </div>

            <div className="mb-5 d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary mb-1 p-2"
                onClick={() => handleVideoClick("video3id")}
              >
                Video
              </button>
              <button type="button" className="btn btn-primary mb-1 p-2">
                Summary
              </button>
            </div>
          </div>
          <div className="col-6 text-center">
            <p>Problem specific</p>
            <div className="mb-5 d-grid gap-2">
              <button
                type="button"
                className="btn btn-success mb-1 p-2"
                onClick={() => handleVideoClick("video4id")}
              >
                Video
              </button>
              <button type="button" className="btn btn-success mb-1 p-2">
                Summary
              </button>
            </div>

            <div className="mb-5 d-grid gap-2">
              <button
                type="button"
                className="btn btn-success mb-1 p-2"
                onClick={() => handleVideoClick("video5id")}
              >
                Video
              </button>
              <button type="button" className="btn btn-success mb-1 p-2">
                Summary
              </button>
            </div>

            <div className="mb-5 d-grid gap-2">
              <button
                type="button"
                className="btn btn-success mb-1 p-2"
                onClick={() => handleVideoClick("video6id")}
              >
                Video
              </button>
              <button type="button" className="btn btn-success mb-1 p-2">
                Summary
              </button>
            </div>
          </div>
        </div>
      </div>
      {showVideo && (
        <VideoSection onClose={handleCloseVideo} videoId={selectedVideoId} />
      )}
    </div>
  );
}

export default HintsSection;
