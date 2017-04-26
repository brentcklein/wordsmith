chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('smithing words');
  chrome.tabs.executeScript(null, {
    file: "smith.js"
  });
});