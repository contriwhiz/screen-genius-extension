import React, { useState, useEffect } from "react";
import closeIcon from "../../assets/images/quix-close-icon1.png";
import userIcon from "../../assets/images/quix-user-icon.png";
import delayIcon from "../../assets/images/quix-delay.png";
import dashboardIcon from "../../assets/images/quix-dashboard.png";
import settignRightArrowIcon from "../../assets/images/quix-settings-arrow-right.png";
import feedbackIcon from "../../assets/images/quix-feedback.png";
import logoutIcon from "../../assets/images/quix-logout.png";
import googleIcon from "../../assets/images/google-icon.png";
import logoFooterIcon from "../../assets/images/quixy-logo-footer.png";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import Select from "../Select/Select";
import Delay from "../Delay/Delay";
import { videoQualityOption } from "../../helper/data";

const SettingTools = ({ handleCloseSettTools }) => {
  const [handleFeedbackModal, setHandleFeedbackModal] = useState(false);
  useEffect(() => {
    console.log("jjjfwkjfkjewkjfkjwekjfklejklfjeklwjklfjwkl")
    const addFeedbackButton = document.getElementById("add-feedback");
   
    const handleFeedbackClick = () => {
      console.log("jgmso")
    if (typeof chrome !== "undefined") {
      chrome.runtime.sendMessage({ action: "openFeedbackPopup" });
    } else {
      console.log(
        "chrome.runtime is not available. This may not work outside the extension environment."
      );
    }
  };

  if (addFeedbackButton) {
    addFeedbackButton.addEventListener("click", handleFeedbackClick);
  }

  return () => {
    // Cleanup: remove event listener when component unmounts
    if (addFeedbackButton) {
      addFeedbackButton.removeEventListener("click", handleFeedbackClick);
    }
  };
}, []); 
  
  
  return (
    <>
      <div id="quix-settings-wrapper" className="quix-settings-wrapper">
        {handleFeedbackModal && (
          <FeedbackModal handleCloseModal={setHandleFeedbackModal} />
        )}
        <div id="quix-settings-inner">
          <div className="quix-settings-top">
            <div className="quix-settings-top-inner">
              <div className="quix-settings-userinfo">
                <img src={userIcon} alt="" />
                <span title="You can login at download page.">Hi Guest!</span>
              </div>
              <div
                className="quix-settings-close"
                onClick={() => handleCloseSettTools(false)}
              >
                <img src={closeIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="quix-settings-mid">
            <div className="quix-settings-mid-inner">
              <label>VIDEO SETTINGS</label>
              <div className="quix-desktop-only quix-tools-block quix-video-quality-dropdown">
                <Select optionObj={videoQualityOption} showIcons={false} />
              </div>
              <div className="quix-autostop-record quix-tools-block quix-video-delay">
                <img alt="" src={delayIcon} />
                <span>Video Delay</span>
                <Delay defaultVal={3} minVal={3} maxVal={59} />
              </div>
              <label>GENERAL SETTINGS</label>
              <div className="quix-autostop-record quix-tools-block user-loggedIn">
                <img alt="" src={dashboardIcon} />
                <span>Go to Dashboard</span>
                <img
                  className="quix-right-icon-setting"
                  alt=""
                  src={settignRightArrowIcon}
                />
              </div>
              <div
                className="quix-autostop-record quix-tools-block" id="add-feedback"
                // onClick={() => setHandleFeedbackModal(!handleFeedbackModal)}
              >
                <img alt="" src={feedbackIcon} />
                <span>Add a Feedback</span>
                <img
                  className="quix-right-icon-setting"
                  alt=""
                  src={settignRightArrowIcon}
                />
              </div>
              <div className="quix-autostop-record quix-tools-block user-loggedOut">
                <img alt="" src={logoutIcon} />
                <span>Log In</span>
              </div>
              <div className="quix-autostop-record quix-tools-block user-loggedOut">
                <img alt="" src={googleIcon} />
                <span>Log In with Gmail</span>
              </div>
              <div className="quix-autostop-record quix-tools-block user-loggedIn">
                <img alt="" src={logoutIcon} />
                <span>Log Out</span>
              </div>
            </div>
          </div>
          <div className="quix-settings-footer">
            <div className="quix-settings-footer-inner">
              <span>powered by</span>
              <img src={logoFooterIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingTools;
