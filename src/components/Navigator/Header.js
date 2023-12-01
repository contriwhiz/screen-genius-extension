import React, { useState } from "react";
import SettingTools from "./SettingTools";
import settingIcon from "../../assets/images/quix-settings-icon.png";
import logoIcon from "../../assets/images/quix-logo-main.png";
import userIcon from "../../assets/images/quix-user-icon.png";

const Header = () => {
  const [handleSettingTools, setHandleSettingTools] = useState(false);

  return (
    <div>
      <div className="quix-popup-inner-top">
        <div className="quix-popup-logo">
          <img className="quix-logo-main" alt="" src={logoIcon} />
          <span className="quix-logo-main-title">ScreenGenius</span>
        </div>
        <div
          className="quix-popup-close"
          onClick={() => setHandleSettingTools(!handleSettingTools)}
        >
          <img className="quix-user-pic" alt="" src={settingIcon} />
        </div>
        <div
          className="quix-popup-user"
          onClick={() => setHandleSettingTools(!handleSettingTools)}
        >
          <img className="quix-user-pic" alt="" src={userIcon} />
          <span
            className="quix-user-name"
            title="You can login at download page."
          >
            Hi Guest!
          </span>
        </div>
        {handleSettingTools && (
          <SettingTools handleCloseSettTools={setHandleSettingTools} />
        )}
      </div>
    </div>
  );
};

export default Header;
