/*global chrome*/
import React, { Component, useEffect } from 'react';
let secondsCounter = 0;
let captureEvent = 0;
let isCameraPopup = 0;
let isMicrophonePopup = 0;
let isPanelPopup = 0;
let isPlayPopup = 0;
let isBadgeTextPopup = "0.00";
let micOptions = false;
let camOptions = false;
let quixyuserData = "";
let quixyLastAction = "";
let quixyCamStarted = false;
export const handleCaptureScreen =(id, event)=>{
    console.log(id, event)
    let uploadType = document.querySelector('.quix-screenshot-video-upload').value;
    localStorage.setItem('sniprruploadType', uploadType);
    chrome.storage.local.get('quixyLoginUserData', function(res)
    {
      quixyuserData = res.quixyLoginUserData;
      if(uploadType === "Cloud" && (quixyuserData === "" || quixyuserData === null))
      {
        document.querySelector("#quix-signin-wrapper").style.display = "block";
        quixyLastAction = "Cloud";
      }
      else
      {
        if(captureEvent === 0)
        {
          captureEvent = 1;
          if(id === 3)
          {
            console.log("id==3 ")
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, 
              {
                  type: "closePreviousWindow"
              }, function(response) {
              });
              setTimeout(function(){
                chrome.tabs.captureVisibleTab(null, {'quality': 100}, function(dataUri) {
                  chrome.tabs.sendMessage(tabs[0].id, 
                  {
                      event: id,
                      dataUri: dataUri,
                      uploadType:uploadType
                  }, function(response) {
                    window.close();
                  });
                });                     
              },100);
            });
          }
          else if(id === 4)
          {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function()
            { 
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 
                {
                    event: id,
                    dataUri: reader.result,
                    uploadType:uploadType
                }, function(response) {
                  document.querySelector(".quix-upload-image input").value = null;
                  window.close();
                });
              });
            }
            reader.onerror = function(error){ console.log(error); }
          }
          else
          {
            let timeDelayElem = parseInt(document.querySelector("#quix-plusMinus-outer input").value)*1000;
            //let data = { "sniprrDelayTimer": (timeDelayElem/1000)+"s" };
            localStorage.setItem('sniprrDelayTimer', (timeDelayElem/1000));
            //chrome.storage.local.set(data, function() {});
            let intervalLimit = timeDelayElem;
            console.log(intervalLimit,"sdfdsfkjdsdsjfjjl")
            let loaderInt = setInterval(function(){
              if(intervalLimit < 0)
              {
                clearInterval(loaderInt);
                document.querySelector(".quix-capture-loading span").innerText = "";
                if(id === 1)
                { 
                  document.querySelector(".quix-capture-loading span").style.display = "none";
                  document.querySelector(".quix-full-inner-bottom").style.display = "block"; 
                }
              }
              else if(intervalLimit > 0)
              {
                document.querySelector(".quix-capture-loading span").style.display = "initial";
                document.querySelector(".quix-capture-loading span").innerText = "Screenshot capturing in "+ (intervalLimit/1000)+" seconds...";
              }
              intervalLimit = intervalLimit-1000;
            },1000);
            setTimeout(function()
            {
              if(id === 1)
              {
                document.querySelector(".quix-capture-area").style.display = "none";
                document.querySelector(".quix-fullscreen-loader").style.display = "block";
                chrome.runtime.onMessage.addListener(
                  function (request, sender, sendResponse) 
                  {
                    if (request.type === "closePopupWindow") 
                    {
                      window.close();
                    }
                  }
                );
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
                {
                    chrome.tabs.sendMessage(tabs[0].id, 
                    {
                      type:"captureFirstTime",
                      uploadType:uploadType
                    }, function(response) 
                    {
                      //window.close();
                    });
                });
              }
              else if(id === 2)
              {
                console.log("2vvbvbvnvvvv")
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  chrome.tabs.captureVisibleTab(null, {'quality': 100}, function(dataUri) {
                    chrome.tabs.sendMessage(tabs[0].id, 
                    {
                        event: id,
                        dataUri: dataUri,
                        uploadType:uploadType,
                        action: 'hello'
                    }, function(response) {
                     // window.close();
                    });
                  });
                });
              }
            }, timeDelayElem); 
          }
        }
      }
    });
  };
  // Request to record screen for all modes
  export const handleRecordScreen = (id) => 
  {
    console.log("handleRecordScreen", id)
    let recordType = id+1;
    if(recordType === 2)
    {
      document.querySelector(".quix-camera-option input").checked = true;
      document.querySelector(".quix-microphone-option input").checked = true;
      document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio.png");
      document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera.png");
    }
    let isCamera = document.querySelector('input[name="is-camera"]:checked');
    let isMicrophone = document.querySelector('input[name="is-microphone"]:checked');
    let recordDelay = parseInt(document.querySelector('.quix-record-delay').value);
    let qualityVal = document.querySelector('.quix-recorder-video-quality').value;
    let uploadType = document.querySelector('.quix-recorder-video-upload').value;
    let micID = document.querySelector(".quix-recorder-ismic").value;
    let camID = document.querySelector(".quix-recorder-iscamera").value;
    chrome.storage.local.get('quixyLoginUserData', function(res)
    {
      quixyuserData = res.quixyLoginUserData;
      if(uploadType === "Cloud" && (quixyuserData === "" || quixyuserData === null))
      {
        document.querySelector("#quix-signin-wrapper").style.display = "block";
        quixyLastAction = "Cloud";
      }
      else
      {
        if(isCamera === null){ isCamera = false; }else{ isCamera = true; }
        if(isMicrophone === null){ isMicrophone = false; }else{ isMicrophone = true; }
        localStorage.setItem('sniprrRecorderDelayTimer', recordDelay);
        localStorage.setItem('sniprrRecorderuploadType', uploadType);
        localStorage.setItem('sniprrRecorderIsMicrophone', isMicrophone);
        localStorage.setItem('sniprrRecorderIsCamera', isCamera); 
        localStorage.setItem('sniprrRecorderVidQuality', qualityVal); 
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, 
          {
              event: recordType,
              isCamera: isCamera,
              camID: camID,
              isMicrophone: isMicrophone,
              micID: micID,
              recordDelay: recordDelay,
              qualityVal: qualityVal,
              uploadType: uploadType,
              type: "videocapture"
          }, function(response) {
            window.close();
          });
        });
      }
    });
  };

  // // Request to capture screenshot for all modes
  // handleRecordSelection = id => event => 
  // {
  //   let clickedBlock = id;
  //   let blocks = document.querySelectorAll(".quix-recording-block");
  //   if(clickedBlock === 1 || clickedBlock === 2)
  //   {
  //     let cameraSelection = document.querySelector(".quix-camera-option input");
  //     cameraSelection.checked = true;
  //   }

  //   for (let i = 0; i < blocks.length; i++) 
  //   {
  //     if(i === id)
  //     {
  //       blocks[id].classList.add("active");
  //       let blocksSelection = document.querySelectorAll(".quix-recording-block input")[id];
  //       blocksSelection.checked = true;
  //     }
  //     else
  //     {
  //       blocks[i].classList.remove("active");
  //     }
  //   }
  // };

  // Request to manage tabs for screenshot capture and screen recording
  export const handleCaptureMode = (mode) =>
  {
    if(mode === "screenshot")
    {
        console.log("handleCaptureMode", mode)
      let timerDelay = localStorage.getItem('sniprrDelayTimer');
      let uploadType = localStorage.getItem('sniprruploadType');
      if(uploadType === undefined || uploadType === null){ uploadType = "Local";}
      if(timerDelay === undefined || timerDelay === null){ timerDelay = "0s";}else{ timerDelay = timerDelay+'s'; }
      document.querySelector("#quix-plusMinus-outer .quix-capture-delay").value = timerDelay;
      localStorage.setItem('snipprrMode', mode);
      document.querySelector(".quix-screenshot-capture").classList.remove("inactive");
      document.querySelector(".quix-video-capture").classList.remove("active");
      document.querySelector(".quix-screenshot-capture").classList.add("active");
      document.querySelector(".quix-video-capture").classList.add("inactive");
      document.querySelector(".quix-tab-recorder").style.display = "none";
      document.querySelector(".quix-tab-toolbox").style.display = "block";
      document.querySelector(".quix-block-local-rec span").innerText = "Open Image Editor";
      document.querySelector(".quix-block-local-rec span").setAttribute("edit-type", "screenshot");

      document.querySelector(".quix-screenshot-upload-dropdown .quix-upload-options-selected").innerHTML = uploadType;
      document.querySelector(".quix-screenshot-upload-dropdown .quix-screenshot-video-upload").value = uploadType;
      var uploadDrop = document.querySelectorAll(".quix-screenshot-upload-dropdown .quix-recorder-video-upload-options .quix-upload-options-row");
      for (let k = 0; k < uploadDrop.length; k++) {
        var textVal = uploadDrop[k].querySelector("span").innerText;
        if(textVal === uploadType)
        {
          uploadDrop[k].classList.add("active");
          if(uploadDrop[k].querySelector("img"))
          {
            var activeIcon = uploadDrop[k].querySelector("img").getAttribute("data-active");
            uploadDrop[k].querySelector("img").src = activeIcon;
          }
        }
      }
    }
    else
    {
      if(!micOptions)
      {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        {
            chrome.tabs.sendMessage(tabs[0].id, 
            {
              type:"getAttachedDevices",
              isMic:true,
              isCam:true
            }, function(response) 
            {
              //window.close();
            });
        });
      }
      let recordtimerDelay = localStorage.getItem('sniprrRecorderDelayTimer');
      let recordUploadType = localStorage.getItem('sniprrRecorderuploadType');
      let recordIsMicrophone = localStorage.getItem('sniprrRecorderIsMicrophone');
      let recordIsCamera = localStorage.getItem('sniprrRecorderIsCamera');
      let sniprrRecorderVidQuality = localStorage.getItem('sniprrRecorderVidQuality');
      if(recordUploadType === undefined || recordUploadType === null){ recordUploadType = "Local";}
      if(sniprrRecorderVidQuality === undefined || sniprrRecorderVidQuality === null){ sniprrRecorderVidQuality = "720p";}
      if(recordtimerDelay === undefined || recordtimerDelay === null){ recordtimerDelay = "3s";}else{ recordtimerDelay = recordtimerDelay+'s'; }

      if(recordIsMicrophone === 'false')
      { 
        recordIsMicrophone = false; 
        document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio-dis.png");
      }
      else
      { 
        recordIsMicrophone = true; 
        document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio.png");
      }
      if(recordIsCamera === 'false'){ 
        recordIsCamera = false;
        document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera-dis.png");
      }else{ 
        recordIsCamera = true; 
        document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera.png"); 
      }

      document.querySelector(".quix-video-quality-dropdown .quix-upload-options-selected").innerHTML = sniprrRecorderVidQuality;
      document.querySelector(".quix-video-quality-dropdown .quix-recorder-video-quality").value = sniprrRecorderVidQuality;
      var qualityDrop = document.querySelectorAll(".quix-video-quality-dropdown .quix-recorder-video-upload-options .quix-upload-options-row");
      for (let j = 0; j < qualityDrop.length; j++) {
        var textVal = qualityDrop[j].querySelector("span").innerText;
        if(textVal === sniprrRecorderVidQuality)
        {
          qualityDrop[j].classList.add("active");
          if(qualityDrop[j].querySelector("img"))
          {
            var activeIcon = qualityDrop[j].querySelector("img").getAttribute("data-active");
            qualityDrop[j].querySelector("img").src = activeIcon;
          }
        }
      }

      document.querySelector(".quix-video-upload-dropdown .quix-upload-options-selected").innerHTML = recordUploadType;
      document.querySelector(".quix-video-upload-dropdown .quix-recorder-video-upload").value = recordUploadType;
      var uploadDrop = document.querySelectorAll(".quix-video-upload-dropdown .quix-recorder-video-upload-options .quix-upload-options-row");
      
      for (let i = 0; i < uploadDrop.length; i++) {
        var textVal = uploadDrop[i].querySelector("span").innerText;
        if(textVal === recordUploadType)
        {
          uploadDrop[i].classList.add("active");
          if(uploadDrop[i].querySelector("img"))
          {
            var activeIcon = uploadDrop[i].querySelector("img").getAttribute("data-active");
            uploadDrop[i].querySelector("img").src = activeIcon;
          }
        }
      }

      let cameraSelection = document.querySelector(".quix-camera-option input");
      cameraSelection.checked = recordIsCamera;
      let micSelection = document.querySelector(".quix-microphone-option input");
      micSelection.checked = recordIsMicrophone;

      document.querySelector("#quix-plusMinus-outer .quix-record-delay").value = recordtimerDelay;
      localStorage.setItem('snipprrMode', mode);
      document.querySelector(".quix-screenshot-capture").classList.remove("active");
      document.querySelector(".quix-video-capture").classList.remove("inactive");
      document.querySelector(".quix-screenshot-capture").classList.add("inactive");
      document.querySelector(".quix-video-capture").classList.add("active");
      document.querySelector(".quix-tab-recorder").style.display = "block";
      document.querySelector(".quix-tab-toolbox").style.display = "none";
      document.querySelector(".quix-block-local-rec span").innerText = "Open Video Editor";
      document.querySelector(".quix-block-local-rec span").setAttribute("edit-type", "recording");
    }
  };

  // // deprecated feature
  // const showHelp =( type, event) => {
  //   if(document.querySelector(".quix-timer-help-outer") !== null)
  //   {
  //     document.querySelector(".quix-timer-help-outer").style.visibility = "visible";
  //   }
  // };

  // // deprecated feature
  // const exitHelp = (type, event) => {
  //   if(document.querySelector(".quix-timer-help-outer") !== null)
  //   {
  //     document.querySelector(".quix-timer-help-outer").style.visibility = "hidden";
  //   }
  // };
  
  // // deprecated feature
  // const handlefileClick = (type, event) => {
  //     document.querySelector(".quix-upload-image input").click();
  // };

//   // To manage delay timer for screenshot capture
//   handleIncementDecrementCaptureDelay = action => event => {  
//     secondsCounter = document.querySelector("#quix-plusMinus-outer .quix-capture-delay").value;
//     secondsCounter = parseInt(secondsCounter);
//     if(action === "plus")
//     {
//       if(secondsCounter <= 60)
//       {
//         secondsCounter = secondsCounter+1;
//       }
//     } 
//     else
//     {
//       if(secondsCounter > 0)
//       {
//         secondsCounter = secondsCounter-1;
//       }
//     } 
//     document.querySelector("#quix-plusMinus-outer .quix-capture-delay").value = secondsCounter+"s";
//   };

//   // To manage delay timer for screen recording
//   handleIncementDecrementRecordDelay = action => event => {  
//     secondsCounter = document.querySelector("#quix-plusMinus-outer .quix-record-delay").value;
//     secondsCounter = parseInt(secondsCounter);
//     if(action === "plus")
//     {
//       if(secondsCounter <= 60)
//       {
//         secondsCounter = secondsCounter+1;
//       }
//     } 
//     else
//     {
//       if(secondsCounter > 3)
//       {
//         secondsCounter = secondsCounter-1;
//       }
//     } 
//     document.querySelector("#quix-plusMinus-outer .quix-record-delay").value = secondsCounter+"s";
//   };

  // To manage autostop timer for screen recording
  //we are not invoking this function anywhere
//   handleIncementDecrementAutoStop = action => event => {  
//     secondsCounter = document.querySelector("#quix-plusMinus-outer .quix-auto-stop").value;
//     secondsCounter = parseInt(secondsCounter);
//     if(action === "plus")
//     {
//       if(secondsCounter <= 60)
//       {
//         secondsCounter = secondsCounter+1;
//       }
//     } 
//     else
//     {
//       if(secondsCounter > 0)
//       {
//         secondsCounter = secondsCounter-1;
//       }
//     } 
//     document.querySelector("#quix-plusMinus-outer .quix-auto-stop").value = secondsCounter+"s";
//   };

  // handle enable and disable actions for camera
  export const handleWebcam = (action) => 
  {
    if(camOptions)
    {
      let isCamera = document.querySelector('input[name="is-tool-camera"]:checked');
      if(isCamera !== null)
      {
        action = "enabled";
        document.querySelector('.quix-camera-option .quix-tool-enabled-icon-state').style.display = "block";
        document.querySelector('.quix-camera-option .quix-tool-disabled-icon-state').style.display = "none";
      }
      else
      {
        action = "disabled";
        document.querySelector('.quix-camera-option .quix-tool-enabled-icon-state').style.display = "none";
        document.querySelector('.quix-camera-option .quix-tool-disabled-icon-state').style.display = "block";
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
        chrome.tabs.sendMessage(tabs[0].id, 
        {
            type: "toolbarEvents",
            eventType: "cam",
            eventVal: action,
        });
      });
    }
  };

  // handle enable and disable actions for microphone
  export const handleMicrophone = (action) => 
  {
    if(micOptions)
    {
      let isMicrophone = document.querySelector('input[name="is-tool-microphone"]:checked');
      if(isMicrophone !== null)
      {
        action = "enabled";
        document.querySelector('.quix-microphone-option .quix-tool-enabled-icon-state').style.display = "block";
        document.querySelector('.quix-microphone-option .quix-tool-disabled-icon-state').style.display = "none";
      }
      else
      {
        action = "disabled";
        document.querySelector('.quix-microphone-option .quix-tool-enabled-icon-state').style.display = "none";
        document.querySelector('.quix-microphone-option .quix-tool-disabled-icon-state').style.display = "block";
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
        chrome.tabs.sendMessage(tabs[0].id, 
        {
            type: "toolbarEvents",
            eventType: "mic",
            eventVal: action,
        });
      });
    }
  }; 

  // handle enable and disable actions for toolbar panel
  export const handleToolbarPanel = (action)=>{
    let isToolbar = document.querySelector('input[name="is-tool-toobar"]:checked');
    if(isToolbar !== null)
    {
      action = "enabled";
      document.querySelector('.quix-toolbar-option .quix-tool-enabled-icon-state').style.display = "block";
      document.querySelector('.quix-toolbar-option .quix-tool-disabled-icon-state').style.display = "none";
    }
    else
    {
      action = "disabled";
      document.querySelector('.quix-toolbar-option .quix-tool-enabled-icon-state').style.display = "none";
      document.querySelector('.quix-toolbar-option .quix-tool-disabled-icon-state').style.display = "block";
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
      chrome.tabs.sendMessage(tabs[0].id, 
      {
          type: "toolbarEvents",
          eventType: "panel",
          eventVal: action,
      });
    });
  }; 

  // Actions to close recording toolbar
  export const handleCloseToolbar = (action, event) => {
    window.close();
  }; 

// handle button to delete/cancel video recording
export const handleButtonDelete = (action, event )=> {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
        type: "toolbarEvents",
        eventType: "delete",
        eventVal: null,
    }, function(response) {
      chrome.storage.local.set({'isRecorderStarted': false}, function(){});
      window.close();
    });
  });
}; 

  // handle play and pause actions for recording toolbar
  export const handleButtonPause = (action, event) => {
    let isPlay = document.querySelector('input[name="is-play-toobar"]:checked');
    if(isPlay !== null)
    {
      action = "play";
      document.querySelector('.quix-play-option .quix-tool-enabled-icon-state').style.display = "block";
      document.querySelector('.quix-play-option .quix-tool-disabled-icon-state').style.display = "none";
    }
    else
    {
      action = "pause";
      document.querySelector('.quix-play-option .quix-tool-enabled-icon-state').style.display = "none";
      document.querySelector('.quix-play-option .quix-tool-disabled-icon-state').style.display = "block";
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
      chrome.tabs.sendMessage(tabs[0].id, 
      {
          type: "toolbarEvents",
          eventType: "pause",
          eventVal: action,
      });
    });
  }; 

  // handle button to stop video recording
  export const handleButtonStop = (action, event) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
      chrome.runtime.sendMessage({type:"unsetBadge"});
      chrome.tabs.sendMessage(tabs[0].id, 
      {
          type: "toolbarEvents",
          eventType: "stop",
          eventVal: null,
      }, function(response) {
        chrome.storage.local.set({'isRecorderStarted': false}, function(){});
        window.close();
      });
    });
  };

  // // Action to share feedback 
  // export const handleFeedbackShare = (action, event) => {
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  //   {
  //     chrome.tabs.sendMessage(tabs[0].id, 
  //     {
  //         type: "shareFeedback",
  //     }, function(response) 
  //     {
  //       window.close();
  //     });
  //   });
  // }; 

  // Open dropdown for mic, camera, save settings, video resolution
  export const openDropdown = (action, event) => 
  {
    if(!micOptions && (action === "video-mic-dropdown" || action === "video-cam-dropdown"))
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
          chrome.tabs.sendMessage(tabs[0].id, 
          {
            type:"getAttachedDevices",
            isMic:true,
            isCam:true
          }, function(response) 
          {
            //window.close();
          });
      });
    }
    let isDisplayed = document.querySelector(".quix-"+action+" .quix-recorder-video-upload-options").style.display;
    let allDropdowns = document.querySelectorAll(".quix-recorder-video-upload-options");
    if(allDropdowns.length > 0)
    {
      for (let index = 0; index < allDropdowns.length; index++) 
      {
        allDropdowns[index].style.display = "none";
      }
    }
    if(isDisplayed === "none" || isDisplayed === "")
    {
      document.querySelector(".quix-"+action+" .quix-recorder-video-upload-options").style.display = "block";
    }
  }; 

  // Perform selection on different dropdowns
  export const selectDropdownValue = (action, event) => 
  {
    let selectedText = event.target.innerText;
    chrome.storage.local.get('quixyLoginUserData', function(res)
    {
      quixyuserData = res.quixyLoginUserData;
      if(selectedText === "Cloud" && (quixyuserData === "" || quixyuserData === null))
      {
        document.querySelector("#quix-signin-wrapper").style.display = "block";
        quixyLastAction = "Cloud";
        document.querySelector(".quix-"+action+" .quix-upload-type-icon").src = "images/quix-save-cloud.png";
        document.querySelector(".quix-"+action+" .quix-upload-options-selected").innerText = selectedText;
        document.querySelector(".quix-"+action+" select").value = selectedText;
      }
      else
      {
        if(selectedText === "Cloud")
        {
          document.querySelector(".quix-"+action+" .quix-upload-type-icon").src = "images/quix-save-cloud.png";
        }
        if(selectedText === "Local")
        {
          document.querySelector(".quix-"+action+" .quix-upload-type-icon").src = "images/quix-save.png";
        }
        document.querySelector(".quix-"+action+" .quix-upload-options-selected").innerText = selectedText;
        document.querySelector(".quix-"+action+" select").value = selectedText;
      }
      var allRows = event.target.parentElement.parentElement.querySelectorAll(".quix-upload-options-row");
      for (let i = 0; i < allRows.length; i++) {
        allRows[i].classList.remove("active");
        if(allRows[i].querySelector("img"))
        {
          var activeIcon = allRows[i].querySelector("img").getAttribute("data-inactive");
          allRows[i].querySelector("img").src = activeIcon;
        }
      }

        var rows = event.target.parentElement;
        if(!rows.classList.contains("quix-upload-options-row"))
        {
          
          event.target.classList.add("active");
          if(rows.querySelector("img"))
          {
            var activeIcon = event.target.querySelector("img").getAttribute("data-active");
            event.target.querySelector("img").src = activeIcon;
          }
        }
        else
        {
          rows.classList.add("active");
          if(rows.querySelector("img"))
          {
            var activeIcon = rows.querySelector("img").getAttribute("data-active");
            rows.querySelector("img").src = activeIcon;
          }
        }
      
      document.querySelector(".quix-"+action+" .quix-recorder-video-upload-options").style.display = "none";
    });
  }; 

  // Select devices from list of devices dropdown
  const selectDropdownDevicesValue = (action, event) => 
  {
    if(action === "video-cam-dropdown")
    {
      let cameraSelection = document.querySelector(".quix-camera-option input");
      cameraSelection.checked = true;
      document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera.png");
      if(!quixyCamStarted)
      {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        {
            chrome.tabs.sendMessage(tabs[0].id, 
            {
              type:"enableCamOnScreen",
              isCam:true
            }, function(response) 
            {
              //window.close();
              quixyCamStarted = true;
            });
        });
      }
    }
    else
    {
      let micSelection = document.querySelector(".quix-microphone-option input");
      micSelection.checked = true;
      document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio.png");
    }
    let selectedText = event.target.getAttribute("data-id");
    document.querySelector(".quix-"+action+" select").value = selectedText;
    document.querySelector(".quix-"+action+" .quix-recorder-video-upload-options").style.display = "none";

    var allRows = event.target.parentElement.parentElement.querySelectorAll(".quix-upload-options-row");
    for (let i = 0; i < allRows.length; i++) {
      allRows[i].classList.remove("active");
      if(allRows[i].querySelector("img"))
      {
        var activeIcon = allRows[i].querySelector("img").getAttribute("data-inactive");
        allRows[i].querySelector("img").src = activeIcon;
      }
    }
    event.target.parentElement.classList.add("active");
    if(event.target.parentElement.querySelector("img"))
    {
      var activeIcon = event.target.parentElement.querySelector("img").getAttribute("data-active");
      event.target.parentElement.querySelector("img").src = activeIcon;
    }
  }; 

  // Manage enable/disable events for camera and mic
  export const handleVideoEvents = (action, event) => 
  { 
    let isMic = document.querySelector('input[name="is-microphone"]:checked');
    let isCam = document.querySelector('input[name="is-camera"]:checked');
    if(isMic != null){ isMic = true; }else{ isMic = false;}
    if(isCam != null){ isCam = true; }else{ isCam = false;}
    if(action == "cam")
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
          chrome.tabs.sendMessage(tabs[0].id, 
          {
            type:"enableCamOnScreen",
            isCam:isCam
          }, function(response) 
          {
            //window.close();
            quixyCamStarted = true;
          });
      });
    }

    if(!micOptions && (isMic || isCam))
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
          chrome.tabs.sendMessage(tabs[0].id, 
          {
            type:"getAttachedDevices",
            isMic:isMic,
            isCam:isCam,
            action:action
          }, function(response) 
          {
            //window.close();
          });
      });
    }
    if(action === "mic")
    {
      if(isMic && micOptions)
      {
        document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio.png");
      }
      else
      {
        document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio-dis.png");
      }
    }
    else
    {
      if(isCam && camOptions)
      {
        document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera.png");
      }
      else
      {
        document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera-dis.png");
      }
    }
  };
  
//   // Toggle settings popup
//   handleSettingsTogglePopup = id => event => 
//   {
//     let isVideoSection = document.querySelector(".quix-tab-recorder").style.display;
//     if(document.querySelector(".quix-settings-wrapper"))
//     {
//       let isVisible = document.querySelector(".quix-settings-wrapper").style.display;
//       if(isVisible === "block")
//       {
//         document.querySelector(".quix-settings-wrapper").style.display = "none";
//       }
//       else
//       {
//         document.querySelector(".quix-settings-wrapper").style.display = "block";
//       }
//     }
//   }
  
  // Open video editor in new tab
  export const handleOpenEditor = (action, event) => 
  {
    var action = document.querySelector(".quix-block-local-rec span").getAttribute("edit-type");
    chrome.storage.local.get('quixyLoginUserData', function(res)
    {
      quixyuserData = res.quixyLoginUserData;
      if((quixyuserData === "" || quixyuserData === null) && action === "recording")
      {
        document.querySelector("#quix-signin-wrapper").style.display = "block";
        quixyLastAction = action;
      }
      else
      {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        {
          chrome.tabs.sendMessage(tabs[0].id, 
          {
            type: "quixyOpenEditor",
            action: action
          }, function(response) 
          {
            window.close();
          });
        });
      }
    });
  }

// Action to go to screengenius dashboard    
export const handlegotoDashboard= (action, event) => 
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type: "quixyGotoDashboard"
    },function(response) 
    {
      window.close();
    });
  });
}

// Action to go to quixy 
export const handlegotoQuixy= (action, event) => 
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type: "quixyGotoQuixy"
    },function(response) 
    {
      window.close();
    });
  });
}

// Action to send request to share feedback
export const handleuserFeedback = (action, event) => 
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type: "quixyShareFeedback"
    },function(response) 
    {
      window.close();
    });
  });
}


// Action to go to screenGenius Login Page 
export const handleuserSocialLogin = (action, event) => 
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type: "quixyGotoQuixyLogin"
    },function(response) 
    {
      window.close();
    });
  });
}

// Action to send user login request 
export const handleuserLogin = (action, event) => 
{
  document.querySelector("#quix-popup-loader").style.display = "block";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type: "quixyUserLogin",
      tabId: tabs[0].id
    });

  });
}

// Action to send user logout request 
export const handleuserLogout = (action, event) => 
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type: "quixyUserLogout"
    },function(response) 
    {
      document.querySelector('.quix-popup-user .quix-user-pic').src = "images/quix-user-icon.png";
      document.querySelector('.quix-popup-user .quix-user-name').innerText = "Hi Guest!";
      document.querySelector('.quix-popup-user .quix-user-name').title = "You can login at download page.";

      document.querySelector('.quix-settings-userinfo img').src = "images/quix-user-icon.png";
      document.querySelector('.quix-settings-userinfo span').innerText = "Hi Guest!";
      document.querySelector('.quix-settings-userinfo span').title = "You can login at download page.";
      
      var loggedIns = document.querySelectorAll('.user-loggedIn');
      for (let i = 0; i < loggedIns.length; i++) {
        loggedIns[i].style.display = "none";
      }
      var loggedOuts = document.querySelectorAll('.user-loggedOut');
      for (let i = 0; i < loggedOuts.length; i++) {
        loggedOuts[i].style.display = "block";
      }
    });
  });
}

// Action to send user login request 
export const handleSigninPopup = (action, event) => 
{
  document.querySelector("#quix-popup-loader").style.display = "block";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type: "quixyUserLogin",
      tabId: tabs[0].id
    },function(){
      document.querySelector("#quix-signin-wrapper").style.display = "none";
    });
  });
}

// Action to manage if user chose to cancel login 
export const handleSigninClose = (action, event) => 
{
  document.querySelector("#quix-signin-wrapper").style.display = "none";
  if(quixyLastAction === "Cloud")
  {
    document.querySelector(".quix-screenshot-upload-dropdown .quix-upload-type-icon").src = "images/quix-save.png";
    document.querySelector(".quix-screenshot-upload-dropdown .quix-upload-options-selected").innerText = "Local";
    document.querySelector(".quix-screenshot-upload-dropdown select").value = "Local";

    document.querySelector(".quix-video-upload-dropdown .quix-upload-type-icon").src = "images/quix-save.png";
    document.querySelector(".quix-video-upload-dropdown .quix-upload-options-selected").innerText = "Local";
    document.querySelector(".quix-video-upload-dropdown select").value = "Local";

    var allRows = document.querySelectorAll(".quix-screenshot-upload-dropdown .quix-upload-options-row");
    for (let i = 0; i < allRows.length; i++) {
      allRows[i].classList.remove("active");
      if(allRows[i].querySelector("img"))
      {
        var activeIcon = allRows[i].querySelector("img").getAttribute("data-inactive");
        allRows[i].querySelector("img").src = activeIcon;
      }
    }
    var activeIcon = allRows[0].querySelector("img").getAttribute("data-active");
    allRows[0].querySelector("img").src = activeIcon;
    allRows[0].classList.add("active");

    var allRowsV = document.querySelectorAll(".quix-video-upload-dropdown .quix-upload-options-row");
    for (let i = 0; i < allRowsV.length; i++) {
      allRowsV[i].classList.remove("active");
      if(allRowsV[i].querySelector("img"))
      {
        var activeIcon = allRowsV[i].querySelector("img").getAttribute("data-inactive");
        allRowsV[i].querySelector("img").src = activeIcon;
      }
    }
    var activeIcon = allRowsV[0].querySelector("img").getAttribute("data-active");
    allRowsV[0].querySelector("img").src = activeIcon;
    allRowsV[0].classList.add("active");
  }
  quixyLastAction = "";
}


// Event to manage on popup features on popup window load
export const customEffect = () => {
// useEffect(()=>
// {
  console.log("hello")

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
    chrome.tabs.sendMessage(tabs[0].id, 
    {
      type:"getActiveSession",
    }, function(response) 
    {
    });
  });
  let clsOBJ = this;
  var port = chrome.runtime.connect();

  // Event when popup is clicked anywhere to close the open dropdown
  document.addEventListener('click', function(event)
  {
    var childUpload = document.querySelector('.quix-screenshot-upload-dropdown');
    var childSettings = document.querySelector('#quix-settings-wrapper');
    var childQuality = document.querySelector('.quix-video-quality-dropdown');
    var childMic = document.querySelector('.quix-video-mic-dropdown');
    var childCam = document.querySelector('.quix-video-cam-dropdown');
    var childRecUpload = document.querySelector('.quix-video-upload-dropdown');
    var childClose = document.querySelector('.quix-popup-close');
    var childUser = document.querySelector('.quix-popup-user');
  
    // Check if the clicked element is inside the parent or child elements
    var isClickedInsideChildUpload = childUpload.contains(event.target);
    var isClickedInsideChildSettings = childSettings.contains(event.target);
    var isClickedInsideChildQuality = childQuality.contains(event.target);
    var isClickedInsideChildMic = childMic.contains(event.target);
    var isClickedInsideChildCam = childCam.contains(event.target);
    var isClickedInsideChildRecUpload = childRecUpload.contains(event.target);
    var isClickedInsideChildClose = childClose.contains(event.target);
    var isClickedInsideChildUser = childUser.contains(event.target);
    if(!isClickedInsideChildUpload && !isClickedInsideChildSettings && !isClickedInsideChildQuality && !isClickedInsideChildMic && !isClickedInsideChildCam && !isClickedInsideChildRecUpload && !isClickedInsideChildClose && !isClickedInsideChildUser)
    {
      var uploadOptions = document.querySelectorAll('.quix-recorder-video-upload-options');
      for (let i = 0; i < uploadOptions.length; i++) {
        uploadOptions[i].style.display = 'none';
      }
      document.querySelector('#quix-settings-wrapper').style.display = 'none';
    }
    if((isClickedInsideChildSettings && !isClickedInsideChildQuality))
    {
      document.querySelector('.quix-video-quality-dropdown .quix-recorder-video-upload-options').style.display = 'none';
    }
    if(isClickedInsideChildClose)
    {
      var uploadOptions = document.querySelectorAll('.quix-recorder-video-upload-options');
      for (let i = 0; i < uploadOptions.length; i++) {
        uploadOptions[i].style.display = 'none';
      }
    }
  });
  
  // Get logged in user's information from local storage
  // chrome.storage.local.get('quixyLoginUserData', function(res)
  // {
  //   quixyuserData = res.quixyLoginUserData;
  //   if(quixyuserData !== "" && quixyuserData !== undefined && quixyuserData !== null)
  //   {
  //     document.querySelector('.quix-popup-user .quix-user-pic').src = quixyuserData.picture;
  //     document.querySelector('.quix-popup-user .quix-user-name').innerText = quixyuserData.name;
  //     document.querySelector('.quix-popup-user .quix-user-name').title = quixyuserData.name;
      
  //     document.querySelector('.quix-settings-userinfo img').src = quixyuserData.picture;
  //     document.querySelector('.quix-settings-userinfo span').innerText = quixyuserData.name;
  //     document.querySelector('.quix-settings-userinfo span').title = quixyuserData.name;

  //     var loggedIns = document.querySelectorAll('.user-loggedIn');
  //     for (let i = 0; i < loggedIns.length; i++) {
  //       loggedIns[i].style.display = "block";
  //     }
  //     var loggedOuts = document.querySelectorAll('.user-loggedOut');
  //     for (let i = 0; i < loggedOuts.length; i++) {
  //       loggedOuts[i].style.display = "none";
  //     }
  //   }
  // });

  // Event when a message is received from background or extension popup window
  chrome.runtime.onMessage.addListener( // this is the message listener
  function(request, sender, sendResponse) 
  {
    if(request.type === "removeCameraPreview") // Event when camera is closed
    {
      document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera-dis.png");
      let cameraSelection = document.querySelector(".quix-camera-option input");
      cameraSelection.checked = false;
    }
    else if(request.type === "quixyuserData") // Event when user data is received 
    {
      quixyuserData = request.user;
      if(quixyuserData !== "" && quixyuserData !== undefined && quixyuserData !== null)
      {
        document.querySelector('.quix-popup-user .quix-user-pic').src = quixyuserData.picture;
        document.querySelector('.quix-popup-user .quix-user-name').innerText = quixyuserData.name;
        document.querySelector('.quix-popup-user .quix-user-name').title = quixyuserData.name;
        
        document.querySelector('.quix-settings-userinfo img').src = quixyuserData.picture;
        document.querySelector('.quix-settings-userinfo span').innerText = quixyuserData.name;
        document.querySelector('.quix-settings-userinfo span').title = quixyuserData.name;
        
        var loggedIns = document.querySelectorAll('.user-loggedIn');
        for (let i = 0; i < loggedIns.length; i++) {
          loggedIns[i].style.display = "block";
        }
        var loggedOuts = document.querySelectorAll('.user-loggedOut');
        for (let i = 0; i < loggedOuts.length; i++) {
          loggedOuts[i].style.display = "none";
        }
        document.querySelector("#quix-popup-loader").style.display = "none";
      }
      else
      {
        document.querySelector('.quix-popup-user .quix-user-pic').src = "images/quix-user-icon.png";
        document.querySelector('.quix-popup-user .quix-user-name').innerText = "Hi Guest!";
        document.querySelector('.quix-popup-user .quix-user-name').title = "You can login at download page.";

        document.querySelector('.quix-settings-userinfo img').src = "images/quix-user-icon.png";
        document.querySelector('.quix-settings-userinfo span').innerText = "Hi Guest!";
        document.querySelector('.quix-settings-userinfo span').title = "You can login at download page.";
        
        var loggedIns = document.querySelectorAll('.user-loggedIn');
        for (let i = 0; i < loggedIns.length; i++) {
          loggedIns[i].style.display = "none";
        }
        var loggedOuts = document.querySelectorAll('.user-loggedOut');
        for (let i = 0; i < loggedOuts.length; i++) {
          loggedOuts[i].style.display = "block";
        }
      }
      if(quixyLastAction === "recording")
      {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        {
          chrome.tabs.sendMessage(tabs[0].id, 
          {
            type: "quixyOpenEditor",
            action: "recording"
          }, function(response) 
          {
            window.close();
          });
        });
      }
    }
    else if(request.type === "setBadge") // set recording timer to toolbar window
    {
      isBadgeTextPopup = request.badgeText;
      document.querySelector(".quix-popup-toolbar-timer-inner span").innerText = request.badgeText;
      isCameraPopup = request.isCamera;
      isMicrophonePopup = request.isMicrophone;
      isPanelPopup = request.isPanel;
      isPlayPopup = request.isPlay;
    }
    else if(request.type === "getAttachedDevicesResponse") // get list of attached devices
    {
      let deviceInfos = request.devices;
      document.querySelector('.quix-recorder-ismic').innerHTML = "";
      document.querySelector('.quix-recorder-iscamera').innerHTML = "";
      document.querySelector('.quix-microphone-option .quix-recorder-video-upload-options-inner').innerHTML = "";
      document.querySelector('.quix-camera-option .quix-recorder-video-upload-options-inner').innerHTML = "";
      if(deviceInfos == null || deviceInfos.length <= 0)
      {
        
        let option = document.createElement("option");
        option.value = "";
        option.innerText = "No Device";
        document.querySelector('.quix-recorder-ismic').appendChild(option);

        let span = document.createElement("span");
        span.innerText = "No Device";
        span.setAttribute('data-id', "");

        let div = document.createElement("div");
        div.className = "quix-upload-options-row active";
        div.appendChild(span);
        document.querySelector('.quix-microphone-option .quix-recorder-video-upload-options-inner').appendChild(div);

        let option2 = document.createElement("option");
        option2.value = "";
        option2.innerText = "No Device";
        document.querySelector('.quix-recorder-iscamera').appendChild(option2);

        let span2 = document.createElement("span");
        span2.innerText = "No Device";
        span2.setAttribute('data-id', "");

        let div2 = document.createElement("div");
        div2.className = "quix-upload-options-row active";
        div2.appendChild(span2);
        document.querySelector('.quix-camera-option .quix-recorder-video-upload-options-inner').appendChild(div2);

        document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio-dis.png");
        let micSelection = document.querySelector(".quix-microphone-option input");
        micSelection.checked = false;

        document.querySelector('.quix-recording-block:nth-child(2)').classList.add("inactive");

      }
      // if(deviceInfos != null && deviceInfos.length <= 0)
      // {
      //   document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio-dis.png");
      //   let micSelection = document.querySelector(".quix-microphone-option input");
      //   micSelection.checked = false;
      //   document.querySelector('.quix-recording-block:nth-child(2)').classList.add("inactive");
      // }
      var camCount = 0;
      for (let i = 0; i !== deviceInfos.length; ++i) 
      {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === 'audioinput') 
        {
          if(deviceInfo.deviceId !== "communications")
          {
            micOptions = true;
            let option = document.createElement("option");
            option.value = deviceInfo.deviceId;
            option.innerText = deviceInfo.label;
            document.querySelector('.quix-recorder-ismic').appendChild(option);

            let span = document.createElement("span");
            span.innerText = deviceInfo.label;
            span.setAttribute('data-id', deviceInfo.deviceId);
            var activeDevice = "";
            if(deviceInfo.deviceId == "default"){ activeDevice = "active"; }
            let div = document.createElement("div");
            div.className = "quix-upload-options-row "+activeDevice;
            div.onclick = selectDropdownDevicesValue('video-mic-dropdown');
            div.appendChild(span);
            document.querySelector('.quix-microphone-option .quix-recorder-video-upload-options-inner').appendChild(div);
          }
        }
        else if (deviceInfo.kind === 'videoinput') 
        {
          camOptions = true;
          let option = document.createElement("option");
          option.value = deviceInfo.deviceId;
          option.innerText = deviceInfo.label;
          document.querySelector('.quix-recorder-iscamera').appendChild(option);

          if(camCount == 0)
          {
            let span = document.createElement("span");
            span.innerText = 'Default';
            span.setAttribute('data-id', 'default');

            let div = document.createElement("div");
            div.className = "quix-upload-options-row active";
            div.onclick = selectDropdownDevicesValue('video-cam-dropdown');
            div.appendChild(span);
            document.querySelector('.quix-camera-option .quix-recorder-video-upload-options-inner').appendChild(div);
          }

          let span = document.createElement("span");
          span.innerText = deviceInfo.label;
          span.setAttribute('data-id', deviceInfo.deviceId);

          let div = document.createElement("div");
          div.className = "quix-upload-options-row";
          div.onclick = clsOBJ.selectDropdownDevicesValue('video-cam-dropdown');
          div.appendChild(span);
          document.querySelector('.quix-camera-option .quix-recorder-video-upload-options-inner').appendChild(div);
          camCount++;
        }
      }
    }
    else if(request.type === "progressLoader")
    {
      document.querySelector(".quix-fullscreen-loader-progress-inner").style.width = request.width+ "%";
    }
  });

  // check if video recording is going on from local to display between recording toolbar and usual popup view
  chrome.storage.local.get('isRecorderStarted', function(resultR)
  {
    let isRecorder = resultR.isRecorderStarted;
    let snipprrMode = localStorage.getItem('snipprrMode');
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    // {
    //   chrome.tabs.sendMessage(tabs[0].id, {type: "quixyPopupAllowedCall"});
    // });
    if(isRecorder !== undefined && isRecorder === true)
    {
      let setRecorderInterval = setInterval(function()
      {
        if(isBadgeTextPopup !== "0.00")
        {
          clearInterval(setRecorderInterval);
          document.querySelector(".quix-popup-toolbar-timer-inner span").innerText = isBadgeTextPopup;

          if(isMicrophonePopup && isMicrophonePopup === true)
          {
            document.querySelector('input[name="is-tool-microphone"]').checked = true;
            document.querySelector('.quix-microphone-option .quix-tool-enabled-icon-state').style.display = "block";
            document.querySelector('.quix-microphone-option .quix-tool-disabled-icon-state').style.display = "none";
          }
          else
          {
            document.querySelector('input[name="is-tool-microphone"]').checked = false;
            document.querySelector('.quix-microphone-option .quix-tool-enabled-icon-state').style.display = "none";
            document.querySelector('.quix-microphone-option .quix-tool-disabled-icon-state').style.display = "block";
          }
          if(isCameraPopup && isCameraPopup === true)
          {
            document.querySelector('input[name="is-tool-camera"]').checked = true;
            document.querySelector('.quix-camera-option .quix-tool-enabled-icon-state').style.display = "block";
            document.querySelector('.quix-camera-option .quix-tool-disabled-icon-state').style.display = "none";
          }
          else
          {
            document.querySelector('input[name="is-tool-camera"]').checked = false;
            document.querySelector('.quix-camera-option .quix-tool-enabled-icon-state').style.display = "none";
            document.querySelector('.quix-camera-option .quix-tool-disabled-icon-state').style.display = "block";
          }
          if(isPanelPopup && isPanelPopup === true)
          {
            document.querySelector('input[name="is-tool-toobar"]').checked = true;
            document.querySelector('.quix-toolbar-option .quix-tool-enabled-icon-state').style.display = "block";
            document.querySelector('.quix-toolbar-option .quix-tool-disabled-icon-state').style.display = "none";
          }
          else
          {
            document.querySelector('input[name="is-tool-toobar"]').checked = false;
            document.querySelector('.quix-toolbar-option .quix-tool-enabled-icon-state').style.display = "none";
            document.querySelector('.quix-toolbar-option .quix-tool-disabled-icon-state').style.display = "block";
          }
          if(isPlayPopup && isPlayPopup === true)
          {
            document.querySelector('input[name="is-play-toobar"]').checked = true;
            document.querySelector('.quix-play-option .quix-tool-enabled-icon-state').style.display = "block";
            document.querySelector('.quix-play-option .quix-tool-disabled-icon-state').style.display = "none";
          }
          else
          {
            document.querySelector('input[name="is-play-toobar"]').checked = false;
            document.querySelector('.quix-play-option .quix-tool-enabled-icon-state').style.display = "none";
            document.querySelector('.quix-play-option .quix-tool-disabled-icon-state').style.display = "block";
          }
        }
      },500);
      if(isBadgeTextPopup === "0.00")
      {
        chrome.storage.local.get('setRecorderToolData', function(resultR)
        {
          let data = resultR.setRecorderToolData;
          let dataArr = data.split("-");
          isBadgeTextPopup = dataArr[0];
          if(dataArr[1] === "true"){ isCameraPopup = true; }else{ isCameraPopup = false; }
          if(dataArr[2] === "true"){ isMicrophonePopup = true; }else{ isMicrophonePopup = false; }
          if(dataArr[3] === "true"){ isPanelPopup = true; }else{ isPanelPopup = false; }
          if(dataArr[4] === "true"){ isPlayPopup = true; }else{ isPlayPopup = false; }
        });
      }
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Retrieve the URL of the first tab
        var url = tabs[0].url;
        if(url.indexOf("chrome-extension:") < 0 && url.indexOf("chrome:") < 0)
        {
          document.querySelector(".quix-capture-area").style.display = "none";
          document.querySelector(".quix-record-tool-area").style.display = "block";
          document.querySelector(".quix-not-available-area").style.display = "none";
        }
        else 
        {
          document.querySelector(".quix-capture-area").style.display = "none";
          document.querySelector(".quix-record-tool-area").style.display = "none";
          document.querySelector(".quix-not-available-area").style.display = "block";
        }
      });
    } 
    else
    {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = tabs[0].url;
        if(url.indexOf("chrome-extension:") < 0 && url.indexOf("chrome:") < 0 && url.indexOf("chrome.google.com") < 0)
        {
          document.querySelector(".quix-capture-area").style.display = "block";
          document.querySelector(".quix-record-tool-area").style.display = "none";
          document.querySelector(".quix-not-available-area").style.display = "none";
        }
        else 
        {
          document.querySelector(".quix-capture-area").style.display = "none";
          document.querySelector(".quix-record-tool-area").style.display = "none";
          document.querySelector(".quix-not-available-area").style.display = "block";
        }
      });

      // display screenshot capture tab in popup
      if(snipprrMode === "screenshot")
      {
        let timerDelay = localStorage.getItem('sniprrDelayTimer');
        let uploadType = localStorage.getItem('sniprruploadType');
        if(uploadType === undefined || uploadType === null){ uploadType = "Local";}
        if(timerDelay === undefined || timerDelay === null){ timerDelay = "0s";}else{ timerDelay = timerDelay+'s'; }
        document.querySelector("#quix-plusMinus-outer .quix-capture-delay").value = timerDelay;
        localStorage.setItem('snipprrMode', snipprrMode);
        document.querySelector(".quix-screenshot-capture").classList.remove("inactive");
        document.querySelector(".quix-video-capture").classList.remove("active");
        document.querySelector(".quix-screenshot-capture").classList.add("active");
        document.querySelector(".quix-video-capture").classList.add("inactive");
        document.querySelector(".quix-tab-recorder").style.display = "none";
        document.querySelector(".quix-tab-toolbox").style.display = "block";
        document.querySelector(".quix-block-local-rec span").innerText = "Open Image Editor";
        document.querySelector(".quix-block-local-rec span").setAttribute("edit-type", "screenshot");

        document.querySelector(".quix-screenshot-upload-dropdown .quix-upload-options-selected").innerHTML = uploadType;
        document.querySelector(".quix-screenshot-upload-dropdown .quix-screenshot-video-upload").value = uploadType;
        var uploadDrop = document.querySelectorAll(".quix-screenshot-upload-dropdown .quix-recorder-video-upload-options .quix-upload-options-row");
        for (let k = 0; k < uploadDrop.length; k++) {
          var textVal = uploadDrop[k].querySelector("span").innerText;
          if(textVal === uploadType)
          {
            uploadDrop[k].classList.add("active");
            if(uploadDrop[k].querySelector("img"))
            {
              var activeIcon = uploadDrop[k].querySelector("img").getAttribute("data-active");
              uploadDrop[k].querySelector("img").src = activeIcon;
            }
          }
        }
      }
      else // display screen recording tab in popup
      {
        //get List of Devices Available
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        {
            chrome.tabs.sendMessage(tabs[0].id, 
            {
              type:"getAttachedDevices",
              isMic:true,
              isCam:true
            }, function(response) 
            {
              //window.close();
            });
        });

        let recordtimerDelay = localStorage.getItem('sniprrRecorderDelayTimer');
        let recordUploadType = localStorage.getItem('sniprrRecorderuploadType');
        let recordIsMicrophone = localStorage.getItem('sniprrRecorderIsMicrophone');
        let recordIsCamera = false; //localStorage.getItem('sniprrRecorderIsCamera');
        let sniprrRecorderVidQuality = localStorage.getItem('sniprrRecorderVidQuality');

        if(recordUploadType === undefined || recordUploadType === null){ recordUploadType = "Local";}
        if(sniprrRecorderVidQuality === undefined || sniprrRecorderVidQuality === null){ sniprrRecorderVidQuality = "720p";}
        if(recordtimerDelay === undefined || recordtimerDelay === null){ recordtimerDelay = "3s";}else{ recordtimerDelay = recordtimerDelay+'s'; }
        if(recordIsMicrophone === 'false')
        { 
          recordIsMicrophone = false; 
          document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio-dis.png");
        }
        else
        { 
          recordIsMicrophone = true; 
          document.querySelector('.quix-microphone-option img').setAttribute("src", "images/quix-audio.png");
        }
        // if(recordIsCamera === 'false'){ 
        //   recordIsCamera = false;
        //   document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera-dis.png");
        // }else{ 
        //   recordIsCamera = true; 
        //   document.querySelector('.quix-camera-option img').setAttribute("src", "images/quix-camera.png"); 
        // }

        document.querySelector(".quix-video-quality-dropdown .quix-upload-options-selected").innerHTML = sniprrRecorderVidQuality;
        document.querySelector(".quix-video-quality-dropdown .quix-recorder-video-quality").value = sniprrRecorderVidQuality;
        var qualityDrop = document.querySelectorAll(".quix-video-quality-dropdown .quix-recorder-video-upload-options .quix-upload-options-row");
        for (let j = 0; j < qualityDrop.length; j++) {
          var textVal = qualityDrop[j].querySelector("span").innerText;
          if(textVal === sniprrRecorderVidQuality)
          {
            qualityDrop[j].classList.add("active");
            if(qualityDrop[j].querySelector("img"))
            {
              var activeIcon = qualityDrop[j].querySelector("img").getAttribute("data-active");
              qualityDrop[j].querySelector("img").src = activeIcon;
            }
          }
        }

        document.querySelector(".quix-video-upload-dropdown .quix-upload-options-selected").innerHTML = recordUploadType;
        document.querySelector(".quix-video-upload-dropdown .quix-recorder-video-upload").value = recordUploadType;
        var uploadDrop = document.querySelectorAll(".quix-video-upload-dropdown .quix-recorder-video-upload-options .quix-upload-options-row");
        for (let i = 0; i < uploadDrop.length; i++) {
          var textVal = uploadDrop[i].querySelector("span").innerText;
          if(textVal === recordUploadType)
          {
            uploadDrop[i].classList.add("active");
            if(uploadDrop[i].querySelector("img"))
            {
              var activeIcon = uploadDrop[i].querySelector("img").getAttribute("data-active");
              uploadDrop[i].querySelector("img").src = activeIcon;
            }
          }
        }

        // let cameraSelection = document.querySelector(".quix-camera-option input");
        // cameraSelection.checked = recordIsCamera;
        let micSelection = document.querySelector(".quix-microphone-option input");
        micSelection.checked = recordIsMicrophone;

        document.querySelector("#quix-plusMinus-outer .quix-record-delay").value = recordtimerDelay;
        localStorage.setItem('snipprrMode', snipprrMode);
        document.querySelector(".quix-screenshot-capture").classList.remove("active");
        document.querySelector(".quix-video-capture").classList.remove("inactive");
        document.querySelector(".quix-screenshot-capture").classList.add("inactive");
        document.querySelector(".quix-video-capture").classList.add("active");
        document.querySelector(".quix-tab-recorder").style.display = "block";
        document.querySelector(".quix-tab-toolbox").style.display = "none";
        document.querySelector(".quix-block-local-rec span").innerText = "Open Video Editor";
        document.querySelector(".quix-block-local-rec span").setAttribute("edit-type", "recording");
      }
    }
  }); 

  
// }, []);
};
