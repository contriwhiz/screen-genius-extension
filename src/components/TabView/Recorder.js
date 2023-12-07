import React from "react";
import entireScreenIcon from "../../assets/images/quix-desktop.png";
import cameraOnlyIcon from "../../assets/images/quix-camera-only.png";
import thisTabIcon from "../../assets/images/quix-this-tab.png";
import selectAreaIcon from "../../assets/images/quix-this-tab-custom.png";
import Select from "../Select/Select";
import { downloadOption } from "../../helper/data";
import DeviceSelectionBlock from "../DeviceSelection/DeviceSelectionBlock";
import disabledMicIcon from '../../assets/images/quix-audio-dis.png'
import enabledMicIcon from '../../assets/images/quix-audio.png'
import disabledCameraIcon from '../../assets/images/quix-camera-dis.png'
import enabledCameraIcon from '../../assets/images/quix-camera.png'
import { handleOpenEditor, handleRecordScreen } from "../../helper/helper";

const Recorder = () => {
  return (
    <>
      <div className="quix-tab-recorder">
        <div className="quix-tab-recorder-inner">
          <div className="quix-tab-recorder-options quix-three-items">
            {/* <DeviceSelection title={'Mic'}  disabledIcon={disabledMicIcon} enabledIcon={enabledMicIcon} />
            <DeviceSelection title={'Camera'} disabledIcon={disabledCameraIcon} enabledIcon={enabledCameraIcon} />
            <Select optionObj={downloadOption} showIcons={true} /> */}
            {/* <DeviceSelectionBlock title={'Mic'} disabledIcon={disabledMicIcon} enabledIcon={enabledMicIcon} />
            <DeviceSelectionBlock title={'Camera'} disabledIcon={disabledCameraIcon} enabledIcon={enabledCameraIcon} />
            <Select optionObj={downloadOption} showIcons={true} /> */}
            <DeviceSelectionBlock />
          </div>
          <div className="quix-recorder-items-label">
            <span>Click to start an action</span>
          </div>
          <div className="quix-tab-recorder-blocks">
            <div className="quix-desktop-only quix-recording-block" onClick={()=>handleRecordScreen(0)}>
              <img alt="" src={entireScreenIcon} />
              <span>Entire Screen</span>
              <input
                readOnly
                checked
                type="radio"
                name="record-type"
                value="1"
              />
            </div>
            <div className="quix-desktop-only quix-recording-block" onClick={()=>handleRecordScreen(1)}>
              <img alt="" src={cameraOnlyIcon} />
              <span>Camera Only</span>
              <input type="radio" name="record-type" value="2" />
            </div>
            <div className="quix-desktop-only quix-recording-block" onClick={()=>handleRecordScreen(2)}>
              <img alt="" src={thisTabIcon} />
              <span>This Tab</span>
              <input type="radio" name="record-type" value="4" />
            </div>
            <div className="quix-desktop-only quix-recording-block" onClick={()=>handleRecordScreen(3)}>
              <img alt="" src={selectAreaIcon} />
              <span>Select Area</span>
              <input type="radio" name="record-type" value="5" />
            </div>
          </div>
          <div className="quix-footer-block quix-upgrade-soon">
            <span>Beta : 5 minute limit per video. Upgrade coming soon!</span>
          </div>
        </div>
      </div>
      <div className="quix-popup-inner-bottom">
        <div className="quix-footer-row1">
          <div className="quix-footer-block quix-block-local-rec">
            <img alt="" src="images/quix-editor.png"/>
            <span edit-type="screenshot" onClick={()=> handleOpenEditor()}>Open Video Editor</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recorder;
