# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


//background.js
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

//content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openFeedbackPopup') {
      console.log('Opening feedback popup...');
      const loaderIcon = request.loaderIcon || "";
      const feedbackIcon = request.feedbackIcon || "";
        console.log(typeof feedbackIcon)
      // Your code to open the feedback popup in the content script
      var html = `<div id="feedback-share-popup-wrapper">\n\
      <div class="feedback-share-popup">\n\
      <div class="feedback-share-heading">\n\
      <img src=${feedbackIcon} alt="feedBackIcon"/>\n\
      <span>Share your feedback with us</span>\n\
      </div>\n\
      <div id="share-feedback-form" class="email-share-form">\n\
          <input type="text" name="to-email-feedback" placeholder="Enter Your Email">\n\
          <textarea id="email-message-feedback" placeholder="Enter Your Feedback" maxlength="900" name="email-message-feedback"></textarea>\n\
          <p class="message-counter"></p>\n\
      </div>\n\
      <div class="feedback-share-submit">\n\
          <img class="loader-icon" src="' +
      ${loaderIcon} +
      '" style="display: none;">\n\
          <button class="send-feedback-share">Send</button>\n\
          <button class="close-feedback-share">Close</button>\n\
      </div>\n\
      </div>\n\
      </div>`;

  
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
  
      document.body.appendChild(tempDiv.firstChild);
    }
  });
            // // Your code to open the feedback popup in the content script
            // console.log('Opening feedback popup...');
            // if (loaderIcon === "") {
            //   loaderIcon = "/images/light-loader.gif";
            // }
            // if (feedbackIcon === "") {
            //   feedbackIcon = "/images/quix-share-feedback-form.png";
            // }
           
            // var tempDiv = document.createElement('div');
            // tempDiv.innerHTML = html;
        
            // document.body.appendChild(tempDiv.firstChild);


///Not in use >>>>>

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'openFeedbackPopup') {
      // Your code to open the feedback popup in the content script
      console.log('Opening feedback popup...');
      
      var html = '<div id="feedback-share-popup-wrapper">\n\
        <div class="feedback-share-popup">\n\
        <div class="feedback-share-heading">\n\
        <img src="' +
        feedbackIcon +
        '"/>\n\
        <span>Share your feedback with us</span>\n\
        </div>\n\
        <div id="share-feedback-form" class="email-share-form">\n\
            <input type="text" name="to-email-feedback" placeholder="Enter Your Email">\n\
            <textarea id="email-message-feedback" placeholder="Enter Your Feedback" maxlength="900" name="email-message-feedback"></textarea>\n\
            <p class="message-counter"></p>\n\
        </div>\n\
        <div class="feedback-share-submit">\n\
            <img class="loader-icon" src="' +
        loaderIcon +
        '" style="display: none;">\n\
            <button class="send-feedback-share">Send</button>\n\
            <button class="close-feedback-share">Close</button>\n\
        </div>\n\
        </div>\n\
        </div>';
  
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
  
      document.body.appendChild(tempDiv.firstChild);
    }
  });



  //////////////////////////
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);

    if (request.action === 'openFeedbackPopup') {
        const feedbackSharePopupWrapperParent = document.getElementById("feedback-share-popup-wrapper");

        // Check if the element exists before trying to remove it
        if (feedbackSharePopupWrapperParent) {
            console.log("fc", feedbackSharePopupWrapperParent);
            // Element exists, remove it
            console.log("feedback removed");
            feedbackSharePopupWrapperParent.remove();
        }

        console.log('Opening feedback popup...');
        const loaderIcon = request.loaderIcon || "";
      const feedbackIcon = request.feedbackIcon || ""; "";

        // Your code to open the feedback popup in the content script
        var html = '<div id="feedback-share-popup-wrapper">\n\
            <div class="feedback-share-popup">\n\
            <div class="feedback-share-heading">\n\
            <img src="'+feedbackIcon+'" alt="feedBackIcon"/>\n\
            <span>Share your feedback with us</span>\n\
            </div>\n\
            <div id="share-feedback-form" class="email-share-form">\n\
                <input type="text" name="to-email-feedback" placeholder="Enter Your Email">\n\
                <textarea id="email-message-feedback" placeholder="Enter Your Feedback" maxlength="900" name="email-message-feedback"></textarea>\n\
                <p class="message-counter"></p>\n\
            </div>\n\
            <div class="feedback-share-submit">\n\
                <img class="loader-icon" src="${loaderIcon}" style="display: none;">\n\
                <button class="send-feedback-share">Send</button>\n\
                <button class="close-feedback-share" id="close-feedback-share">Close</button>\n\
            </div>\n\
            </div>\n\
        </div>';

        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        document.body.appendChild(tempDiv.firstChild);

        // Use event delegation to handle the click event on the body
        document.body.addEventListener("click", (event) => {
            const closeBtn = event.target.closest(".close-feedback-share");
            console.log(event.target.closest(".close-feedback-share"));
            console.log('event.target');
            if (closeBtn) {
                console.log("close button clicked");
                const feedbackSharePopupWrapperParent = document.getElementById("feedback-share-popup-wrapper");
                if (feedbackSharePopupWrapperParent) {
                    console.log("closae", feedbackSharePopupWrapperParent);
                    console.log("feedback removed");
                    feedbackSharePopupWrapperParent.remove();
                }
            }
        });
    }
});