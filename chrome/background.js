chrome.runtime.onInstalled.addListener(() => {

  // On installed, each bank contains an obj for
  // holding switch value
  chrome.storage.local.set({TD: false}, () => {
    console.log
  });
  chrome.storage.local.set({Simplii: false}, () => {
    console.log
  });
});


