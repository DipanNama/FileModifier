chrome.action.onClicked.addListener(function(tab) {
    // Get the current window's size
    chrome.windows.getCurrent({populate: true}, function(window) {
      // Define the size of the popup window
      const width = 300;
      const height = 200;
  
      // Calculate the position to center the popup window
      const left = Math.floor(window.width / 2 - width / 2);
      const top = Math.floor(window.height / 2 - height / 2);
  
      // Create the new window centered on the screen
      chrome.windows.create({
        url: chrome.runtime.getURL('popup.html'),
        type: 'popup',
        width: width,
        height: height,
        left: left,
        top: top
      });
    });
  });
  