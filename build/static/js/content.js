// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'openFeedbackPopup') {
//       console.log('Opening feedback popup...');
//       const loaderIcon = request.loaderIcon || "";
//       const feedbackIcon = request.feedbackIcon || "";
//         console.log(typeof feedbackIcon)
//       // Your code to open the feedback popup in the content script
//       var html = `<div id="feedback-share-popup-wrapper">\n\
//       <div class="feedback-share-popup">\n\
//       <div class="feedback-share-heading">\n\
//       <img src=${feedbackIcon} alt="feedBackIcon"/>\n\
//       <span>Share your feedback with us</span>\n\
//       </div>\n\
//       <div id="share-feedback-form" class="email-share-form">\n\
//           <input type="text" name="to-email-feedback" placeholder="Enter Your Email">\n\
//           <textarea id="email-message-feedback" placeholder="Enter Your Feedback" maxlength="900" name="email-message-feedback"></textarea>\n\
//           <p class="message-counter"></p>\n\
//       </div>\n\
//       <div class="feedback-share-submit">\n\
//           <img class="loader-icon" src="' +
//       ${loaderIcon} +
//       '" style="display: none;">\n\
//           <button class="send-feedback-share">Send</button>\n\
//           <button class="close-feedback-share">Close</button>\n\
//       </div>\n\
//       </div>\n\
//       </div>`;

  
//       var tempDiv = document.createElement('div');
//       tempDiv.innerHTML = html;
  
//       document.body.appendChild(tempDiv.firstChild);
//     }
//   });


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);

    if (request.action === 'openFeedbackPopup') {
        const feedbackSharePopupWrapperParent = document.getElementById("feedback-share-popup-wrapper");

        // Check if the element exists before trying to remove it
        if (feedbackSharePopupWrapperParent) {
            console.log("ffgddfh", feedbackSharePopupWrapperParent);
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
