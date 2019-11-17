$(document).ready(() => {

  let TDSwitch = $('#TDSwitch');
  let SimpSwitch = $('#SimpSwitch');

  // Check the switch state in chrome.storage
  chrome.storage.local.get(['TD'], (result) => {

    (result.TD) ? TDSwitch.prop('checked', true) : TDSwitch.prop('checked', false);
  });
  chrome.storage.local.get(['Simplii'], (result) => {

    (result.Simplii) ? SimpSwitch.prop('checked', true) : SimpSwitch.prop('checked', false);
  });

  // Event fires when switch changes and store state in chrome.storage
  TDSwitch.change(() => {

    var state  = document.getElementById('TDSwitch').checked;
    chrome.storage.local.set({TD: state});
    chrome.storage.local.get(['TD'], (result) => {
      console.log(result.TD);
    });

    executeScript();
  });
    
  SimpSwitch.change(() => {

    var state  = document.getElementById('SimpSwitch').checked;
    console.log(state);
    chrome.storage.local.set({Simplii: state});
    chrome.storage.local.get(['Simplii'], (result) => {
      console.log(result.Simplii);
    });
  });
});

executeScript = () => { 
  chrome.tabs.executeScript({
    file: 'content.js'
  })
}
