import React, { useState } from "react";
import Capture from "./Capture";
import Recorder from "./Recorder";
import captureIcon from "../../assets/images/quix-screen-recording.png";
import recorderIcon from "../../assets/images/quix-camera-recording.png";

const TabsView = () => {
  const [tabHandler, setTabHendler] = useState(0);
  return (
    <>
      <div className="quix-popup-tabs">
        <div
          className={`quix-capture-mode quix-screenshot-capture ${
            tabHandler === 0 ? "active" : "inactive"
          }`}
          onClick={() => setTabHendler(0)}
          title="Screenshot Capture"
        >
          <img alt="" src={captureIcon} />
          <span>Capture</span>
        </div>
        <div
          className={`quix-capture-mode quix-video-capture ${
            tabHandler === 1 ? "active" : "inactive"
          }`}
          title="Video Recording"
          onClick={() => setTabHendler(1)}
        >
          <img alt="" src={recorderIcon} />
          <span>Recorder</span>
        </div>
      </div>
      {tabHandler === 0 ? <Capture /> : <Recorder />}
    </>
  );
};

export default TabsView;
