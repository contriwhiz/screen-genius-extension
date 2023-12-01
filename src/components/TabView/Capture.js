import React from "react";
import delayIcon from "../../assets/images/quix-delay.png";
import fullPageIcon from "../../assets/images/quix-full-page.png";
import visiblePartIcon from "../../assets/images/quix-visible-area.png";
import selectAreaIcon from "../../assets/images/quix-selected-screen.png";
import Select from "../Select/Select";
import { downloadOption } from "../../helper/data";
import Delay from "../Delay/Delay";

const Capture = () => {
  return (
    <>
      <div className="quix-tab-toolbox">
        <div className="quix-screenshot-options-outer">
          <div className="quix-timer-elem">
            <img alt="" src={delayIcon} />
            <span className="screeng-bg-img" id="quix-time-delay">
              Delay
            </span>
            <Delay defaultVal={0} minVal={0} maxVal={4} />
            <div className="quix-timer-help-outer">
              <div className="quix-timer-help-inner">
                <p className="quix-timer-help-text">
                  You can use the timer to delay the screenshot capture. This
                  feature is available for all type of Screenshot capture.
                </p>
              </div>
            </div>
          </div>
          <Select optionObj={downloadOption} showIcons={true} />
        </div>
        <div className="quix-screenshot-items-label">
          <span>Click to start an action</span>
        </div>
        <ul>
          <li className="quix-full-page-elem">
            <div className="quix-image-outer">
              <img alt="" src={fullPageIcon} />
            </div>
            <span>Full Page</span>
          </li>
          <li className="quix-visible-part-elem">
            <div className="quix-image-outer">
              <img alt="" src={visiblePartIcon} />
            </div>
            <span>Visible Part</span>
          </li>
          <li className="quix-selected-area-elem">
            <div className="quix-image-outer">
              <img alt="" src={selectAreaIcon} />
            </div>
            <span>Select Area</span>
          </li>
        </ul>
        <div className="quix-capture-loading">
          <span></span>
        </div>
        <div className="quix-full-inner-bottom">
          <span className="quix-full-inner-loader">
            Screenshot is being captured
            <span className="quix-loader__dot">.</span>
            <span className="quix-loader__dot">.</span>
            <span className="quix-loader__dot">.</span>
          </span>
        </div>
      </div>
      <div className="quix-popup-inner-bottom">
        <div className="quix-footer-row1">
          <div className="quix-footer-block quix-block-local-rec">
            <img alt="" src="images/quix-editor.png"/>
            <span edit-type="screenshot">Open Image Editor</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Capture;
