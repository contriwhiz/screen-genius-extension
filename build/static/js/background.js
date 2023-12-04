const loaderIcon = "/images/light-loader.gif";
const feedbackIcon = "/images/quix-share-feedback-form.png";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    // ... your code ...
        if (request.action === 'openFeedbackPopup') {
            console.log("background.request.action")
             // Sending a message to the content script to open the feedback popup
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs && tabs.length > 0) {
                    console.log("jsl", tabs[0].id);
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'openFeedbackPopup', loaderIcon, feedbackIcon });
                  } else {
                    console.error("No active tabs found.");
                  }
            });

        }
  });   
