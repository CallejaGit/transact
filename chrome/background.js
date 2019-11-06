chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
      code: "console.log('OKAY');alert(document.getElementsByTagName('Script').length)"
    });
});
