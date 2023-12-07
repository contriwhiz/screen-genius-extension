/*global chrome*/
if(screenShotType === undefined)
{
    // Global variables defined to use across the screenshot and screen recording feature
    var isDevicesAvailable = true;
    var start = {};
    var end = {};
    var isSelecting = false;
    var winH = 0; 
    var wScrolled = 0;
    var docHeight = 0;
    var baseImgArr = [];
    var imagesposY = 0;
    var lastScreenshotH = 0;
    var fullScreenShotCan = "";
    var fullScreenShotContext = "";
    var rect = {};
    var rectB = {};
    var rectH = {};
    var rectS = {};
    var rectR = {};
    var ctx = "";
    var ctxB = "";
    var ctxH = "";
    var ctxS = "";
    var imageObjB = null;
    var imageObjS = null;
    var canBGMain = null;
    var canvasMain = null;
    var drag = "";
    var dragRecord = "";
    var screenPriorToBlur= "";
    var screenPriorToHighlight = "";
    var screenPriorToShape = "";
    var screenPriorToUpload = "";
    var screensHistoryData = [];
    var screensHistoryStep = 0;
    var screenShotType = "Visible Part";
    var originalImage = "";
    var FuturaBkBook1 = chrome.runtime.getURL("/fonts/FuturaBkBook.woff");
    var FuturaBkBook2 = chrome.runtime.getURL("/fonts/FuturaBkBook.woff2");
    var loaderIcon = chrome.runtime.getURL("/images/light-loader.gif");
    var attachmentIcon = chrome.runtime.getURL("/images/attachment.png");
    var recordingType = "";

    var blankVideo = chrome.runtime.getURL("/images/blank-video.mp4");

    var textIcon2 = chrome.runtime.getURL("/images/quix-text2-icon.png");
    var rectanleIcon2 = chrome.runtime.getURL("/images/quix-reactanle2-icon.png");
    var downIcon1 = chrome.runtime.getURL("/images/quix-down-icon.png");
    var rectanleIcon1 = chrome.runtime.getURL("/images/quix-reactanle-icon.png");
    var ovalIcon = chrome.runtime.getURL("/images/quix-oval-icon.png");
    var lineIcon = chrome.runtime.getURL("/images/quix-shape-line-icon.png");
    var arrowIcon = chrome.runtime.getURL("/images/quix-shape-arrow-icon.png");
    var markertoolIcon = chrome.runtime.getURL("/images/quix-markertool-icon.png");
    var blurIcon = chrome.runtime.getURL("/images/quix-blur-icon.png");
    var cropIcon = chrome.runtime.getURL("/images/quix-croptool-icon.png");
    var uploadtoolIcon = chrome.runtime.getURL("/images/quix-uploadool-icon.png");
    var closeIcon = chrome.runtime.getURL("/images/quix-close-icon.png");
    var closeIconTool = chrome.runtime.getURL("/images/quix-tool-close2.png");
    var expandIcon = chrome.runtime.getURL("/images/quix-expand-icon.png");
    var minusIcon = chrome.runtime.getURL("/images/quix-minus-icon.png");
    var plusIcon = chrome.runtime.getURL("/images/quix-plus-icon.png");
    var copyIcon2 = chrome.runtime.getURL("/images/quix-copy2-icon.png");
    var shareIcon2 = chrome.runtime.getURL("/images/quix-share2-icon.png");
    var downIcon3 = chrome.runtime.getURL("/images/quix-down3-icon.png");
    var downloadIcon2 = chrome.runtime.getURL("/images/quix-download2-icon.png");
    var downIcon4 = chrome.runtime.getURL("/images/quix-down4-icon.png");
    var undoIcon = chrome.runtime.getURL("/images/quix-undo-icon.png");
    var redoIcon = chrome.runtime.getURL("/images/quix-redo-icon.png");
    var resetIcon = chrome.runtime.getURL("/images/quix-reset-icon.png");
    var italicIcon = chrome.runtime.getURL("/images/quix-italic-icon.png");
    var boldIcon = chrome.runtime.getURL("/images/quix-bold-icon.png");
    var underlineIcon = chrome.runtime.getURL("/images/quix-underline-icon.png");
    var alignleftIcon = chrome.runtime.getURL("/images/quix-alignleft-icon.png");
    var aligncenterIcon = chrome.runtime.getURL("/images/quix-aligncenter-icon.png");
    var alignrightIcon = chrome.runtime.getURL("/images/quix-alignright-icon.png");
    var logoIcon1 = chrome.runtime.getURL("/images/logo-48.png");
    var logoIcon2 = chrome.runtime.getURL("/images/quixy-logo-footer.png");
    var logoIcon3 = chrome.runtime.getURL("/images/quix-logo-main.png");
    var linkIcon = chrome.runtime.getURL("/images/quix-link-green-icon.png");
    var emailIcon = chrome.runtime.getURL("/images/quix-email-icon.png");
    var stopRecIcon = chrome.runtime.getURL("/images/quix-tool-stop.png");
    var delRecIcon = chrome.runtime.getURL("/images/quix-delete-icon.png");
    var camSelectIcon = chrome.runtime.getURL("/images/quix-webcam-options.png");
    var camOp1Icon = chrome.runtime.getURL("/images/quix-webcam-option1.png");
    var camOp2Icon = chrome.runtime.getURL("/images/quix-webcam-option2.png");
    var camOp3Icon = chrome.runtime.getURL("/images/quix-webcam-option3.png");
    var camOp4Icon = chrome.runtime.getURL("/images/quix-webcam-option4.png");
    
    var dragIcon= chrome.runtime.getURL("/images/quix-drag-icon.png");
    var webcamIcon = chrome.runtime.getURL("/images/quix-webcam-tool.png");
    var webcamDisIcon = chrome.runtime.getURL("/images/quix-webcam-disabled-tool.png");
    var microphoneIcon = chrome.runtime.getURL("/images/quix-microphone-icon2.png");
    var microphoneDisIcon = chrome.runtime.getURL("/images/quix-microphone-disabled-icon.png");
    var cursorIcon1 = chrome.runtime.getURL("/images/quix-cursor-icon.png");
    var cursorIcon2 = chrome.runtime.getURL("/images/quix-cursor-icon1.png");
    var cursorIcon3 = chrome.runtime.getURL("/images/quix-cursor-icon2.png");
    var cursorIcon4 = chrome.runtime.getURL("/images/quix-cursor-icon3.png");
    var pencilIcon = chrome.runtime.getURL("/images/quix-pencil-icon.png");
    var erasorIcon = chrome.runtime.getURL("/images/quix-eraser-icon.png");
    var arrowLeftIcon = chrome.runtime.getURL("/images/quix-arrow-left-icon.png");
    var arrowRightIcon = chrome.runtime.getURL("/images/quix-arrow-right-icon.png");
    var freeLineIcon = chrome.runtime.getURL("/images/quix-free-line-icon.png");
    var blockIcon = chrome.runtime.getURL("/images/quix-block-icon.png");
    var arrowToolIcon = chrome.runtime.getURL("/images/quix-for-icon.png");
    var toolPauseIcon  = chrome.runtime.getURL("/images/quix-tool-pause.png");
    var toolPlayIcon  = chrome.runtime.getURL("/images/quix-tool-play.png");
    var vcallIcon = chrome.runtime.getURL("images/quix-video-call-icon.png");
    var userIcon = chrome.runtime.getURL("images/quix-user-icon.png");
    var youtubeIcon = chrome.runtime.getURL("images/quix-youtube-icon.png");
    var GDIcon = chrome.runtime.getURL("images/quix-google-drive-icon.png");
    var feedbackIcon = chrome.runtime.getURL("images/quix-share-feedback-form.png");
    var successIcon = chrome.runtime.getURL("/images/quix-success.png");
    var failureIcon = chrome.runtime.getURL("/images/quix-failure.png");
    var screenshotName = "";
    var capturedFirstItem = 0;
    if(!requestSentToCaptureScreen || requestSentToCaptureScreen === undefined){ var requestSentToCaptureScreen = 0; }
    var requestReceivedOnceScreenCaptured = 0;
    var preScreenshotLength = 0;
    var selectedShape = "";
    var isChanged = false;
    var previouscolor = "";
    var isReachedScreenshotlimit = 0;
    var canvas_background = null;
    var isCanvasBackground = 0;
    var canvasScale = 1;
    var updateScreenshot = "";
    var zoomValueX = 0;
    var zoomValueY = 0;
    var zoomValuePercent = 100;
    var zoomValuePercentRatio = 1;
    var cooridnatesDrawnAt = [];
    var whiteSpaceAround = 200;
    var quix_displayMediaOptions = {};
    var quix_videoElem = document.createElement('video');
    var desktop_sharing = false;
    var local_stream = null;
    var cam_stream = null;
    var screen_stream = null;
    var combine_stream = null;
    var audioStream = null;
    var composedStream = null;
    var screenStream = null;
    var media_recorder = null;
    var setTimerInterval = null;
    var record_crop_startX, record_crop_startY;
    var video_crop = false;
    var uploadTypeSettings = false;
    var fullSLoaderINT = '';
    var setBadgeText = '';
    var isCancelledRecord = false;

    var isCameraRecord = true;
    var isMicrophoneRecord = true;
    var isPanelRecord = true;
    var isPlayRecord = true;
    var userConfirmedClose = false;
    var recordingStarted = false;

    var imagesLimit = 30;
    var videosLimit = 15;

    window.onbeforeunload = function(event)
    {
        if (!userConfirmedClose && recordingStarted && recordingType != 1) 
        {
            const confirmationMessage = 'Screen Recording will be cancelled if you chose to reload the page?';
            (event || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        }
    }

    window.onload = function() 
    {
        // To load video recording tootlbar on page reload if video is still being recorded
        chrome.storage.local.get('isRecorderStarted', async function (obj) {
            if(obj.isRecorderStarted)
            {
                chrome.storage.local.get('setRecorderToolData', async function (obj) 
                {
                    let data = obj.setRecorderToolData;
                    let dataArr = data.split("-");
                    recordingType = dataArr[5];
                    if(recordingType == 1)
                    {
                        displayControls(undefined,true,undefined, dataArr[6], function()
                        {
                            //updateControlBarStates(dataArr[1],dataArr[2],dataArr[3],dataArr[4]);
                            updateControlBarTime(dataArr[0]);
                        });
                    }
                    else
                    {
                        isCancelledRecord = true; 
                        stopScreenRecording(); 
                    }
                });
            }
        });
    }
    // Event when a message is received from background or extension popup window
    chrome.runtime.onMessage.addListener( // this is the message listener
        async function(request, sender, sendResponse) 
        {
            if(request.type == "captureFirstTime") // Request to capture screneshot for full screen for first screen
            {
                chrome.runtime.sendMessage({type:"closeExtensionPages"});
                if(request.uploadType != "Local")
                {
                    chrome.storage.local.get('quixyLoginUserData', function(res)
                    {
                        quixyuserData = res.quixyLoginUserData;
                        if(quixyuserData.screenshots == imagesLimit)
                        {
                            let text = "You have reached max upload limit so you cannot upload screenshots to cloud. Do you want to continue with local download?";
                            if(confirm(text))
                            {
                                request.uploadType = "Local";
                                captureFullScreenshotsRequest(request);
                            }
                        }
                        else
                        {
                            captureFullScreenshotsRequest(request);
                        }
                    });
                }
                else
                {
                    captureFullScreenshotsRequest(request);
                }
            }
            else if(request.type == "sendScroll") // Request to capture screneshot for full screen for scrolled screen 
            {
                if(request.dataUri !== undefined && request.dataUri != "data:," && requestSentToCaptureScreen > 0 && (preScreenshotLength == 0 || preScreenshotLength !== request.dataUri.length))
                {
                    preScreenshotLength = request.dataUri.length;
                    requestReceivedOnceScreenCaptured = requestReceivedOnceScreenCaptured+1;
                    baseImgArr.push(request.dataUri);
                    scrollWindowManual();  
                }
            }
            else if(request.type == "getGoogleAuth") // Request to google for login
            {
                jQuery.ajax({ 
                    url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+request.authToken,
                    success: function(result)
                    {
                        googleLoginPopup(result);
                    }
                });
            }
            else if(request.type == "closePreviousWindow") // Request to close previous window
            {
                canvas_background = null;
                isCanvasBackground = 0;
                if(document.getElementById("canvas_background"))
                {
                    document.getElementById("canvas_background").remove(); 
                    jQuery("#close-captureScreen").unbind('click');
            		jQuery("#close-captureScreen").remove();
                }
            }
            else if(request.type == "videocapture") // Request to record screen
            {
                chrome.runtime.sendMessage({type:"closeExtensionPages"});
                if(request.uploadType != "Local")
                {
                    chrome.storage.local.get('quixyLoginUserData', function(res)
                    {
                        var quixyuserData = res.quixyLoginUserData;
                        if(quixyuserData.videos == videosLimit)
                        {
                            let text = "You have reached max upload limit so you cannot upload videos to cloud. Do you want to continue with local download?";
                            if(confirm(text)) 
                            {
                                request.uploadType = "Local";
                                chrome.storage.local.get('isDevicesPermitted', function(resultR)
                                {
                                    var isDevicesPermitted = resultR.isDevicesPermitted;
                                    if(!isDevicesPermitted)
                                    {
                                        let text = "You have blocked access to Camera and Microphone which cannot be allowed while recording. Permissions can be allowed under tab settings. Do you want to continue without Camera and Microphone permissions?";
                                        if(confirm(text)) 
                                        {
                                            chrome.runtime.sendMessage({type:"videocaptureScreen",event: request});
                                        }  
                                    }
                                    else
                                    {
                                        chrome.runtime.sendMessage({type:"videocaptureScreen",event: request});   
                                    } 
                                });
                            }
                        }
                        else
                        {
                            chrome.storage.local.get('isDevicesPermitted', function(resultR)
                            {
                                var isDevicesPermitted = resultR.isDevicesPermitted;
                                if(!isDevicesPermitted)
                                {
                                    let text = "You have blocked access to Camera and Microphone which cannot be allowed while recording. Permissions can be allowed under tab settings. Do you want to continue without Camera and Microphone permissions?";
                                    if(confirm(text)) 
                                    {
                                        chrome.runtime.sendMessage({type:"videocaptureScreen",event: request});
                                    }  
                                }
                                else
                                {
                                    chrome.runtime.sendMessage({type:"videocaptureScreen",event: request});   
                                } 
                            });
                        }
                    });
                }
                else
                {
                    chrome.storage.local.get('isDevicesPermitted', function(resultR)
                    {
                        var isDevicesPermitted = resultR.isDevicesPermitted;
                        if(!isDevicesPermitted)
                        {
                            let text = "You have blocked access to Camera and Microphone which cannot be allowed while recording. Permissions can be allowed under tab settings. Do you want to continue without Camera and Microphone permissions?";
                            if(confirm(text)) 
                            {
                                chrome.runtime.sendMessage({type:"videocaptureScreen",event: request});
                            }  
                        }
                        else
                        {
                            chrome.runtime.sendMessage({type:"videocaptureScreen",event: request});   
                        } 
                    });
                }  
            }
            else if(request.type == "videocaptureScreenResponseEntire") // Request to record for entire screen 
            {
                chrome.storage.local.get('isDevicesAvailable', function(resultR)
                {
                    isDevicesAvailable = resultR.isDevicesAvailable;
                    try 
                    {
                        quix_startCapture(request.event,request.currentTab);  
                    }
                    catch (error) 
                    {
                        window.top.close();
                    }
                });    
            }
            else if(request.type == "videocaptureScreenResponse") // Request to record screen for camera, this tab and cutom tab
            {
                chrome.storage.local.get('isDevicesAvailable', function(resultR)
                {
                    isDevicesAvailable = resultR.isDevicesAvailable;
                    var data7 = { "isPictureInPicture" : false };
                    chrome.storage.local.set(data7, function() {});
                    exitPictureInPicture();
                    setTimeout(function(){ quix_startCapture(request.event,''); },200);  
                });   
            }
            else if(request.type == "toolbarEvents") // Request to manage different toolbar actions from popup
            {
                switch(request.eventType) 
                {
                  case "cam":
                    toolbarToggleCam(request.eventVal);
                    break;
                  case "mic":
                    toolbarToggleMic(request.eventVal);
                    break;
                  case "timer":
                    // code block
                    break;
                  case "panel":
                    hidePanelRecording(request.eventVal);
                    break;
                  case "delete":
                    isCancelledRecord = true;
                    cancelScreenRecording();
                    break;
                  case "pause":
                    toolbarPlayPause(request.eventVal);
                    break;
                  case "stop":
                    isCancelledRecord = false;
                    if(recordingType == 1){ chrome.runtime.sendMessage({type:"executeScriptInallTabs", reqType: "hideToolbar"}); }
                    stopScreenRecording();
                    break;
                  default:
                    // code block
                }
            }
            else if(request.type == "quixyShareFeedback") // Request to share feedback from popup
            {
                shareFeedbackPopup();
            }
            else if(request.type == "quixyUserLogin") // Request to user login from popup
            {
                chrome.runtime.sendMessage({type:"quixyUserLoginCallback", event: request});
            }
            else if(request.type == "getActiveSession")
            {
                chrome.runtime.sendMessage({type:"getActiveSessionCall"});
            }
            else if(request.type == "quixyUserLoginResponse") // User login callback
            {
                jQuery.ajax({ 
                    url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+request.token,
                    success: function(result)
                    {
                        chrome.runtime.sendMessage({type:"quixyUserLoginXMLCall","res":result});
                        // handleQuixyLogIn(result,function(res)
                        // {
                        //     chrome.runtime.sendMessage({type:"quixyuserData",user:res.data});
                        //     var data = { "quixyLoginUserData" : res.data};
                        //     chrome.storage.local.set(data, function() {});
                        // });
                    }
                });
            }
            else if(request.type == "quixyUserLogout") // Request to user logout from popup
            {
                chrome.runtime.sendMessage({type:"quixyUserLogoutCall"});
            }
            else if(request.type == "getAttachedDevices") // Request to get list of devices from popup
            {
                handleGetDevices(request.isMic, request.isCam);
            }
            else if(request.type == "enableCamOnScreen") // Request to enable camera on screen
            {
                if(request.isCam)
                {
                    var data7 = { "isPictureInPicture" : false };
                    chrome.storage.local.set(data7, function() {});
                    recordingType = 1;
                    isCameraRecord = true;
                    recordCameraScreen();
                }
                else
                {
                    recordingType = 1;
                    isCameraRecord =  false;
                    stopCameraScreen();
                }
            }
            else if(request.type == "quixyGotoDashboard") // Request to go to dashboard from popup
            {
                chrome.runtime.sendMessage({type:"quixyGotoDashboardCallback", event: request}); 
            }  
            else if(request.type == "quixyGotoQuixy") // Request to go to quixy from popup
            {
                chrome.runtime.sendMessage({type:"quixyGotoQuixyCallback", event: request}); 
            }
            else if(request.type == "quixyGotoQuixyLogin") // Request to go to screenGenius Login Page
            {
                chrome.runtime.sendMessage({type:"quixyGotoQuixyLoginCallback", event: request}); 
            }
            else if(request.type == "quixyOpenEditor") // Request to open screenshot editor from popup
            {
                chrome.runtime.sendMessage({type:"quixyOpenEditorCallback", event: request}); 
            }
            else if(request.type == "extensionPopupClosed") // Event when extension popup is closed
            {
                if(!request.isRecording && inPIPMode)
                {
                    toolbarToggleCam("disabled");
                }
            }
            else if(request.type == "executeScriptInallTabsCallback") // Execute script in all tabs for entire screen feature
            {
                if(request.event.reqType == "hideToolbar") // request to hide toolbar
                {
                    isCancelledRecord = false;
                    stopScreenRecording("other");
                }
                else if(request.event.reqType == "cancelToolbar") // Request to cancel toolbar
                {
                    isCancelledRecord = true;
                    stopScreenRecording("other");
                }
                else if(request.event.reqType == "toolbarEventsAllTabsTimer") // Request to update timer in toolbar on all screens for entire screen recording
                {
                    updateControlBarTime(request.event.badgeText);
                }
                else if(request.event.reqType == "toolbarEventsAllTabs") // Request to update toolbar icons on all screens for entire screen recording
                {
                    // if(request.event.reqVal !== isCameraRecord)
                    // {
                        updateControlBarStates(request.event.reqSubType,request.event.reqVal);
                    // }
                }
                else // Request to display control panel
                {
                    var autostopVal = request.event.autostopVal;
                    var recordDelay = request.event.recordDelay;
                    var delayD = request.event.delayD;
                    var recType = request.event.recordingType;
                    isCameraRecord = request.event.isCamera;
                    isMicrophoneRecord  = request.event.isMicrophone;
                    isPanelRecord  = request.event.isPanel;
                    isPlayRecord  = request.event.isPlay;
                    recordingType = recType;
                    // cancelScreenRecording();
                    chrome.storage.local.get('isDevicesAvailable', function(resultR)
                    {
                        isDevicesAvailable = resultR.isDevicesAvailable;
                        displayControls(autostopVal,delayD,recordDelay,isDevicesAvailable,function(){ });
                    });
                }
            }    
            else // Request to capture screenshot for Visible part, selected area and custom upload
            {
                chrome.runtime.sendMessage({type:"closeExtensionPages"});
                if(request.uploadType != "Local")
                {
                    chrome.storage.local.get('quixyLoginUserData', function(res)
                    {
                        quixyuserData = res.quixyLoginUserData;
                        if(quixyuserData.screenshots == imagesLimit)
                        {
                            let text = "You have reached max upload limit so you cannot upload screenshots to cloud. Do you want to continue with local download?";
                            if(confirm(text)) 
                            {
                                request.uploadType = "Local";
                                captureScreenshotsRequest(request);
                            }
                        }
                        else
                        {
                            captureScreenshotsRequest(request);
                        }
                    });
                }
                else
                {
                    captureScreenshotsRequest(request);
                }
            }
            
            var data = { "quixyScreenShotType" : screenShotType };
            chrome.storage.local.set(data, function() {});
            clearFinalScreenshot();
            sendResponse();
        }
    );
}

function captureFullScreenshotsRequest(request)
{
    screenShotType = "Full Page";
    if(capturedFirstItem == 0)
    {
        resetScreenFeatures();
        capturedFirstItem = 1;
        captureFirstTime();
        fullSLoaderINT = setInterval(function()
        {
            let winScrolledY = jQuery("html").scrollTop();
            let totDocHeight = document.body.clientHeight;
            let width = parseInt((winScrolledY/totDocHeight)*100);
            if(width < 5){ width = 5; }
            chrome.runtime.sendMessage({type: "progressLoader", width: width});
        },500);
    }
}
function captureScreenshotsRequest(request)
{
    if(request.event == 2)
    {
        screenShotType = "Visible Part";
        if(request.uploadType != "Local"){ uploadTypeSettings = true; }
        resetScreenFeatures();
        handleCaptureVisibleScreen(request.dataUri);
    }
    if(request.event == 4)
    {
        screenShotType = "Uploaded";
        if(request.uploadType != "Local"){ uploadTypeSettings = true; }
        resetScreenFeatures();
        handleCaptureVisibleScreen(request.dataUri);
    }
    else if(request.event == 3)
    {
        isCanvasBackground += 1;
        screenShotType = "Selected Area";
        if(request.uploadType != "Local"){ uploadTypeSettings = true; }
        if(isCanvasBackground > 0 && isCanvasBackground < 2)
        {
            resetScreenFeatures();
            handleCaptureSelectedScreen(request.dataUri);
        }
    }
}
// Remove all the events added to page for screenshot capture
function resetScreenFeatures() 
{
    start = {};
    end = {};
    isSelecting = false;
    winH = 0; 
    wScrolled = 0;
    docHeight = 0;
    baseImgArr = [];
    imagesposY = 0;
    lastScreenshotH = 0;
    fullScreenShotCan = "";
    fullScreenShotContext = "";
    capturedFirstItem = 0;
    requestSentToCaptureScreen = 0;
    requestReceivedOnceScreenCaptured = 0;
    isReachedScreenshotlimit = 0;
    jQuery("#download-overlay").remove();
    jQuery(".download-screenshot").unbind("click");
    jQuery(".download-screenshot-full").unbind("click");
    jQuery(".close-download").unbind("click");
}
// To capture visible screen
function handleCaptureVisibleScreen(dataUri)
{
    if(dataUri !== undefined && dataUri !== "")
    {
        //jQuery("body").css({"overflow":"hidden", "height" : "auto"});
        chrome.runtime.sendMessage({type:"openNewTab",screen:dataUri,originalImage:dataUri,screenshotName:screenshotName,screenshotUploadServer:uploadTypeSettings});
        //openDownloadArea(dataUri);
    }
    else
    {
        alert("Screenshot capture failed for this screen.");
    }
}

// To capture selected screen
function handleCaptureSelectedScreen(dataUri)
{
    get_coords_screenshot(dataUri, function(imageURI){
        if(imageURI !== undefined && imageURI !== "")
        {
            //jQuery("body").css({"overflow":"hidden", "height" : "auto"});
            chrome.runtime.sendMessage({type:"openNewTab",screen:imageURI,originalImage:imageURI,screenshotName:screenshotName,screenshotUploadServer:uploadTypeSettings});
            //openDownloadArea(imageURI);
        }
        else
        {
            alert("Screenshot capture failed for this screen.");
        }
    });
    
} 

// To handle error for MediaDevices
function handleError(error)
{
    if( error.name == "NotFoundError")
    {
        var data1 = { "isDevicesAvailable": false };
        var data2 = { "isDevicesPermitted": true };
        chrome.storage.local.set(data1, function() {});
        chrome.storage.local.set(data2, function() {});
        chrome.runtime.sendMessage({type:"getAttachedDevicesResponse", devices:[]});
    }
    else
    {
        var data1 = { "isDevicesAvailable": false };
        var data2 = { "isDevicesPermitted": false };
        chrome.storage.local.set(data1, function() {});
        chrome.storage.local.set(data2, function() {});
        chrome.runtime.sendMessage({type:"getAttachedDevicesResponse", devices: null});
    }
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

// Handler to manage recorded streams
function handleGotStream(stream)
{
  window.stream = stream; // make stream available to console
  return navigator.mediaDevices.enumerateDevices();
}

// Handler to get list of devices 
function handleGetDevices(isMic, isCam)
{
    let constraints = {};
    constraints = {   
        audio: isMic,
        video: isCam
    };
    navigator.mediaDevices.getUserMedia(constraints).then(handleGotStream).then(function(devices)
    {
        if (window.stream) 
        {
            window.stream.getTracks().forEach(track => {
            track.stop();
            });
        }
        var data1 = { "isDevicesAvailable": true };
        chrome.storage.local.set(data1, function() {});
        var data2 = { "isDevicesPermitted": true };
        chrome.storage.local.set(data2, function() {});
        chrome.runtime.sendMessage({type:"getAttachedDevicesResponse", devices:devices});
    }).catch(handleError);
}

// Deprecated feature
function openDownloadArea(screenshot)
{
    screensHistory(screenshot);
    var html = '<div id="download-overlay" class="fulscreen-mode">\n\
        <div id="download-overlay-inner" class="download-overlay-inner half-screen-view">\n\
            <input type="hidden" value="'+loaderIcon+'" id="loader-icon-hid">\n\
            <input type="hidden" value="'+attachmentIcon+'" id="attachment-icon-hid">\n\
            <div id="screenshot-wrapper" >\n\
                <div id="screenshot-wrapper-top">\n\
                    <div class="screenshot-title"><input type="text" name=""></div>\n\
                    <ul class="sideBar-ul annotate-ul" >\n\
                        <li class="sideBar-li quix-text" title="Text"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+textIcon2+'"/></div></li>\n\
                        <li class="sideBar-li quix-shapes" title="Shapes"><div class="sideBar-li-inner"><img class="sideBar-icon  shape-parent-icon" src="'+rectanleIcon2+'"/><img class="sideBar-icon" src="'+downIcon1+'"/></div>\n\
                            <div class="shapes-popup-outer">\n\
                                <div class="shapes-popup-inner">\n\
                                    <div class="shape-row shape-reactangle"><div class="shape-col"><img src="'+rectanleIcon2+'"></div></div>\n\
                                    <div class="shape-row shape-oval"><div class="shape-col"><img src="'+ovalIcon+'"></div></div>\n\
                                    <div class="shape-row shape-line"><div class="shape-col"><img src="'+lineIcon+'"></div></div>\n\
                                    <div class="shape-row shape-arrow"><div class="shape-col"><img src="'+arrowIcon+'"></div></div>\n\
                                </div>\n\
                            </div>\n\
                        </li>\n\
                        <li class="sideBar-li quix-highlight" title="Highlight"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+markertoolIcon+'"/></div></li>\n\
                        <li class="sideBar-li quix-blur" title="Blur"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+blurIcon+'"/></div></li>\n\
                        <li class="sideBar-li quix-crop" title="Crop"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+cropIcon+'"/></div></li>\n\
                        <li class="sideBar-li quix-upload" title="Image Upload"><input type="file" id="imgUpload" name="imgUpload"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+uploadtoolIcon+'"/></div></li>\n\
                    </ul>\n\
                    <div class="screenshot-close">\n\
                        <span class="screenshot-close-inner"><img src="'+closeIcon+'" title="Close"></span>\n\
                    </div>\n\
                    <div class="screenshot-maximize">\n\
                        <span class="screenshot-maximize-inner"><img src="'+expandIcon+'" title="Maximize"></span>\n\
                    </div>\n\
                    <div class="sideBar-seperator">|</div>\n\
                    <div class="screenshot-zoom">\n\
                        <span class="zoom-quix-out"><img src="'+minusIcon+'" title=\'Shift + "+"\'></span>\n\
                        <span class="zoom-quix-status">100%</span>\n\
                        <span class="zoom-quix-in"><img src="'+plusIcon+'" title=\'Shift + "-"\'></span>\n\
                    </div>\n\
                    <div class="sideBar-seperator">|</div>\n\
                    <ul class="sideBar-ul share-ul" >\n\
                        <li class="sideBar-li copy-clipboard" title="Copy to Clipboard"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+copyIcon2+'"/></li>\n\
                        <li class="sideBar-li icon-shareable" title="Share">\n\
                            <div class="sideBar-li-inner">\n\
                                <img class="sideBar-icon" src="'+shareIcon2+'"/>\n\
                                <img class="sideBar-icon" src="'+downIcon3+'"/>\n\
                            </div>\n\
                            <div class="share-popup-outer">\n\
                                <div class="share-popup-inner">\n\
                                    <div class="share-row share-link label-share"><div class="download-col"><img class="download-col-img" src="'+linkIcon+'"/><span>Share Link</span></div></div>\n\
                                    <div class="share-row share-email label-email"><div class="download-col"><img class="download-col-img" src="'+emailIcon+'"/><span>Share via Email</span></div></div>\n\
                                </div>\n\
                            </div>\n\
                        </li>\n\
                        <li class="sideBar-li label-download" title="Download">\n\
                            <div class="sideBar-li-inner">\n\
                                <img class="sideBar-icon" src="'+downloadIcon2+'"/>\n\
                                <img class="sideBar-icon" src="'+downIcon4+'"/>\n\
                            </div>\n\
                            <div class="download-popup-outer">\n\
                                <div class="download-popup-inner">\n\
                                    <div class="download-row download-png"><div class="download-col"><span>PNG</span></div></div>\n\
                                    <div class="download-row download-jpeg"><div class="download-col"><span>JPG</span></div></div>\n\
                                    <div class="download-row download-pdf"><div class="download-col"><span>PDF</span></div></div>\n\
                                </div>\n\
                            </div>\n\
                        </li>\n\
                    </ul>\n\
                    <ul class="sideBar-ul manage-ul" >\n\
                        <li class="sideBar-li icon-undo" title="Undo"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+undoIcon+'"/></li>\n\
                        <li class="sideBar-li icon-redo" title="Redo"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+redoIcon+'"/></div></li>\n\
                        <li class="sideBar-li label-reset" title="Reset Changes"><div class="sideBar-li-inner"><img class="sideBar-icon" src="'+resetIcon+'"/></div></li>\n\
                    </ul>\n\
                </div>\n\
                <div id="annotations-popup-outer">\n\
                    <div class="annotations-popup-inner">\n\
                        <div class="annotation-row annotation-font-family">\n\
                            <div class="annotation-col">\n\
                                <select id="font-family">\n\
                                    <option value="Arial">Arial</option>\n\
                                    <option value="serif">serif</option>\n\
                                    <option value="sans-serif">Sans-serif</option>\n\
                                    <option value="Verdana">Verdana</option>\n\
                                    <option value="Times New Roman">Times New Roman</option>\n\
                                    <option value="Courier New">Courier New</option>\n\
                                </select>\n\
                            </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-fonts">\n\
                            <div class="annotation-col">\n\
                                <select id="font-size">\n\
                                    <option value="10">10</option>\n\
                                    <option value="12">12</option>\n\
                                    <option selected value="14">14</option>\n\
                                    <option value="16">16</option>\n\
                                    <option value="22">22</option>\n\
                                    <option value="26">26</option>\n\
                                    <option value="32">32</option>\n\
                                    <option value="40">40</option>\n\
                                    <option value="48">48</option>\n\
                                    <option value="60">60</option>\n\
                                    <option value="72">72</option>\n\
                                </select>\n\
                            </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-fonts-styles">\n\
                            <div class="annotation-col">\n\
                                <span class="input-radio-custom input-radio-custom-style">\n\
                                    <input type="checkbox" name="font_style[]" value="Italic">\n\
                                    <img src="'+italicIcon+'"/>\n\
                                </span>\n\
                                <span class="input-radio-custom input-radio-custom-style">\n\
                                    <input type="checkbox" name="font_style[]" value="Bold">\n\
                                    <img src="'+boldIcon+'"/>\n\
                                </span>\n\
                                <span class="input-radio-custom input-radio-custom-style">\n\
                                    <input type="checkbox" name="font_style[]" value="Underline">\n\
                                    <img src="'+underlineIcon+'"/>\n\
                                </span>\n\
                                <span class="input-radio-custom input-radio-custom-align active">\n\
                                    <input checked type="radio" name="text_alignment" value="start">\n\
                                    <img src="'+alignleftIcon+'"/>\n\
                                </span>\n\
                                <span class="input-radio-custom input-radio-custom-align">\n\
                                    <input type="radio" name="text_alignment" value="center">\n\
                                    <img src="'+aligncenterIcon+'"/>\n\
                                </span>\n\
                                <span class="input-radio-custom input-radio-custom-align">\n\
                                    <input type="radio" name="text_alignment" value="end">\n\
                                    <img src="'+alignrightIcon+'"/>\n\
                                </span>\n\
                            </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-fonts-colors">\n\
                            <div class="annotation-col">\n\
                                <div class="fields-col5" title="Text Color">\n\
                                    <input id="font-color" value="#FF0000" type="text" readonly>\n\
                                    <div class="color-picker-wrapper"><span id="text-color-picker"></span></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-fill-transparency">\n\
                            <div class="annotation-col">\n\
                                <div class="fields-col5" title="Fill/Transparency">\n\
                                    <input id="font-fill" value="#FFFF00" type="text" readonly>\n\
                                    <div class="color-picker-wrapper"><span id="fill-color-picker"></span></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-outline">\n\
                            <div class="annotation-col">\n\
                                <div class="fields-col5" title="Outline">\n\
                                    <input id="font-outline" value="#000000" type="text" readonly>\n\
                                    <div class="color-picker-wrapper"><span id="outline-color-picker"></span></div>\n\
                                </div>\n\
                                <div class="fields-col2" title="Outline Size">\n\
                                    <input id="font-ouline-size" type="number" min="1" max="5" value="3">\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-blur">\n\
                            <div class="annotation-col">\n\
                                <div class="fields-col5">\n\
                                    <input id="blur-strength" type="number" min="1" max="5" value="3">\n\
                                </div>\n\
                             </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-highlight">\n\
                            <div class="annotation-col">\n\
                                <div class="highlight-type">\n\
                                    <select id="highlightType">\n\
                                        <option value="Brush">Brush</option>\n\
                                        <option value="Block">Block</option>\n\
                                    </select>\n\
                                </div>\n\
                                <div class="highlight-size">\n\
                                    <select id="highlight-size">\n\
                                        <option value="small">Small</option>\n\
                                        <option value="medium">Medium</option>\n\
                                        <option value="large">Large</option>\n\
                                    </select>\n\
                                </div>\n\
                                <input id="highlight-bg-input" value="#ff0" type="text" readonly>\n\
                                <div class="color-picker-wrapper"><span id="highlight-bg-color-picker"></span></div>\n\
                                <div class="highlight-pallette">\n\
                                    <span data-color="#ff0" style="background-color: #ff0;"></span>\n\
                                    <span data-color="#30FF00" style="background-color: #30FF00;"></span>\n\
                                    <span data-color="#FF004A" style="background-color: #FF004A;"></span>\n\
                                    <span data-color="#1600FF" style="background-color: #1600FF;"></span>\n\
                                    <span data-color="#000000" style="background-color: #000000;"></span>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="annotation-row annotation-horizontal"><div class="annotation-col"><label>X</label><input id="x-val" value="0" type="text"></div></div>\n\
                        <div class="annotation-row annotation-vertical"><div class="annotation-col"><label>Y</label><input id="y-val" value="0" type="text"></div></div>\n\
                        <div class="annotation-row annotation-width"><div class="annotation-col"><label>W</label><input id="width-val" value="0" type="text"></div></div>\n\
                        <div class="annotation-row annotation-height"><div class="annotation-col"><label>H</label><input id="height-val" value="0" type="text"></div></div>\n\
                        <div class="annotation-row annotation-buttons">\n\
                            <div class="cancel-annotation">\n\
                                 <button>cancel</button>\n\
                            </div>\n\
                            <div class="save-annotation">\n\
                                 <button class="text-button">Save</button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
                <div id="screenshot-wrapper-bottom-copyright" class="screenshot-wrapper-bottom-copyright">\n\
                    <div class="copyright-logo"><img src="'+logoIcon1+'"><span>ScreenGenius</span></div>\n\
                    <div class="copyright-updates"><span class="copyright-updates-inner">Checkout ScreenGenius version 1.0 & enjoy the updated features!</span></div>\n\
                    <div class="copyright-logo-powered">\n\
                        <span class="copyright-reserved">powered by</span>\n\
                        <a target="_blank" href="https://quixy.com/"><img src="'+logoIcon2+'"></a>\n\
                    </div>\n\
                </div>\n\
                <div id="screenshot-wrapper-bottom">\n\
                    <div id="screenshot-wrapper-bottom-wrap">\n\
                        <div id="screenshot-wrapper-bottom-wrap-inner">\n\
                            <canvas id="captured-screen">\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </div>\n\
    <style>@font-face {font-family: "FuturaBkBook";src: url('+FuturaBkBook2+') format("woff2"), url('+FuturaBkBook1+') format("woff");}</style>';
    jQuery("body").append(html);
    var image = new Image();
    image.onload = function() 
    {
        screenshotName = "IMG_"+(Math.floor(Math.random() * 10000));
        jQuery(".screenshot-title input").val(screenshotName);
        //jQuery("#screenshot-wrapper-bottom-wrap").css({"width": parseInt((image.width+((whiteSpaceAround)*2)+30))+"px"});
        var canvas = document.getElementById("captured-screen");
        canvas.height = image.height+((whiteSpaceAround/zoomValuePercentRatio)*2);
        canvas.width = image.width+((whiteSpaceAround/zoomValuePercentRatio)*2);
        var context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, (whiteSpaceAround/zoomValuePercentRatio), (whiteSpaceAround/zoomValuePercentRatio));
        var sshot = canvas.toDataURL("image/jpeg",1);
        originalImage = sshot;
        chrome.runtime.sendMessage({type:"updateCordinates",cooridnatesDrawnAt:cooridnatesDrawnAt});
        autoadjustScreenshot(canvas.width,canvas.height);
        addEventListeners();
    };
    image.src = screenshot;
    
}

// To capture first screen for full Page screenshot
function captureFirstTime()
{  
    jQuery("body").css({"overflow":"hidden", "pointer-events":"none", "height" : "auto"}); 
    window.scrollTo(0, 0);
    requestSentToCaptureScreen = requestSentToCaptureScreen+1; 
    setTimeout(function()
    {
        winH = window.innerHeight;
        docHeight = document.body.clientHeight;
        chrome.runtime.sendMessage({type:"nextFrame"});
    },500);
}

// To capture scrolled window for full Page screenshot
function scrollWindowManual()
{ 
    var winScrolledX = jQuery("html").scrollLeft();
    var winScrolledY = jQuery("html").scrollTop();
    if(winH > 0)
    {
        setTimeout(function()
        {
            wScrolled = wScrolled + winH;
            if((wScrolled) < docHeight && baseImgArr.length <= 30)
            {
                if(wScrolled+winH > docHeight){ lastScreenshotH = docHeight-wScrolled; }
                window.scrollTo(0, wScrolled);

                jQuery('*').filter(function() {
                        return $(this).css("position") === 'fixed' || $(this).css("position") === 'sticky';
                }).css({"visibility":"hidden"});
                setTimeout(function()
                {
                    requestSentToCaptureScreen = requestSentToCaptureScreen+1;
                    chrome.runtime.sendMessage({type:"nextFrame"});
                },500);
            }
            else
            {
                if(wScrolled < docHeight){ isReachedScreenshotlimit = 1; }
                var fullScreenInt = setInterval(function(){
                    if(requestSentToCaptureScreen == requestReceivedOnceScreenCaptured)
                    {
                        clearInterval(fullScreenInt);
                        $('*').filter(function() {
                            return jQuery(this).css("position") === 'fixed' || $(this).css("position") === 'sticky';
                        }).css({"visibility":"visible"});
                        jQuery("body").css({"pointer-events": "auto","overflow":"auto"});
                        fullScreenCaptured(); 
                    }
                },500);
                
            }
        },500);
    }
    else
    {
        var checkForWInH = setInterval(function(){
            winH = window.innerHeight;
            docHeight = document.body.clientHeight;
            if(winH > 0)
            {
                clearInterval(checkForWInH);
                scrollWindowManual();
            }
        },500);
    }
}

// Capture last screenshot for full Page screenshot
function lastScreenCaptured()
{
    fullScreenShotCan = document.createElement("canvas");
    var image = new Image();
    image.onload = function() 
    {
        if(isReachedScreenshotlimit <= 0)
        {
            lastScreenshotH = lastScreenshotH - parseInt(((winH - image.height)/winH)*lastScreenshotH);
            var canvas = document.createElement("canvas");
            canvas.height = lastScreenshotH;
            canvas.width = image.width;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, (image.height-lastScreenshotH), image.width, lastScreenshotH, 0, 0, image.width, lastScreenshotH);
            var screenCap = canvas.toDataURL("image/jpeg",1);
            var lastItemKey = (baseImgArr.length-1);
            if(screenCap !== undefined && screenCap != "data:," && lastItemKey >= 0)
            { 
                baseImgArr[lastItemKey] = screenCap;
                fullScreenShotCan.height = ((image.height*(baseImgArr.length-1)) + lastScreenshotH);
            }
        }
        else
        {
            fullScreenShotCan.height = (image.height*(baseImgArr.length));
        }
        fullScreenShotCan.width = image.width;
        fullScreenShotContext = fullScreenShotCan.getContext("2d");
        concatinateImagesCallback(image.height,winH,true);
    };
    image.src = baseImgArr[(baseImgArr.length-1)];
}

// Call when full Page screenshot is entirely captured
function fullScreenCaptured()
{
    if(baseImgArr.length > 1)
    {
        lastScreenCaptured();
    }
    else if(baseImgArr.length == 1)
    {
        if(baseImgArr[0] !== undefined && baseImgArr[0] !== "")
        {
            clearInterval(fullSLoaderINT);
            capturedFirstItem = 0;
            //openDownloadArea(baseImgArr[0]);
            chrome.runtime.sendMessage({type:"openNewTab",screen:baseImgArr[0],originalImage:baseImgArr[0],screenshotName:screenshotName,screenshotUploadServer:uploadTypeSettings});
            chrome.runtime.sendMessage({type:"closePopupWindow"});
        }
        else
        {
            alert("Screenshot capture failed for this screen.");
        }
    }
}

// Merge different screenshots callback
function concatinateImagesCallback(imgHeight,winHeight,isFirstTime)
{
    if(baseImgArr.length > 0)
    {
        if(!isFirstTime){ imagesposY = imagesposY + imgHeight; }
        concatinateImagesIntoOne(baseImgArr[0], imagesposY, imgHeight, winHeight, concatinateImagesCallback);
    }
    else
    {
        var fullscreen = fullScreenShotCan.toDataURL("image/jpeg",1);
        if(fullscreen !== undefined && fullscreen !== "")
        {
            clearInterval(fullSLoaderINT);
            capturedFirstItem = 0;
            //openDownloadArea(fullscreen);
            chrome.runtime.sendMessage({type:"openNewTab",screen:fullscreen,originalImage:fullscreen,screenshotName:screenshotName});
            chrome.runtime.sendMessage({type:"closePopupWindow"});
        }
        else
        {
            alert("Screenshot capture failed for this screen.");
        }
    }
}

// Merge different screenshots into one for full Page screenshot
function concatinateImagesIntoOne(base64img, yPos, imgHeight, winHeight, callback)
{
    var image = new Image();
    image.onload = function() 
    {
        fullScreenShotContext.drawImage(image, 0, yPos);
        baseImgArr.shift();
        callback(imgHeight, winHeight, false);
    };
    image.src = base64img;
}