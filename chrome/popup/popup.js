$(document).ready(() => {
  let tokenBtn = $('#tokenBtn')
  let budgetBtn = $('#budgetBtn') 
  let TDSwitch = $('#TDSwitch');
  let SimpSwitch = $('#SimpSwitch');

  // Using Long Lived Connections to commnicata from
  // background.js to popup.js
  var port = chrome.extension.connect({
    name: "Sample Communication"
  });

  port.onMessage.addListener(function(msg) {

    if (msg.subject === "validated PAT" && msg.validation != false) {
      console.log("inhere")
      chrome.storage.local.set({PAT: msg.token});
      
      // Once we get the validation we should update the budgets
      port.postMessage({
        subject: "get budgets",
        token: msg.token 
      });
    }

    if (msg.subject == "get selected Budget") {
      console.log('TODO')
    }

    if (msg.subject == "got budgets") {
      var data = JSON.parse(msg.json)["data"]["budgets"];
     
      var nameIDpairs = {}
      for (var i = 0; ; i++) {
        if (typeof data[i] == 'undefined') {break;}
        
        name = data[i]["name"];
        id = data[i]["id"];
        nameIDpairs[name] = id
      }
      
      chrome.storage.local.set({budgets: nameIDpairs});
    }

  });

  // Set the values obtained from the local storage
  chrome.storage.local.get(['PAT'], (result) => {
    if (chrome.runtime.lastError || typeof result.PAT == 'undefined') {
      return;
    }
    $("#tokenInput").val(result.PAT);
  })

  chrome.storage.local.get(['budgets'], (result) => {
    if (chrome.runtime.lastError || typeof result.budgets == 'undefined') {
      return;
    }

    // Populate the options for selection tag
    $.each(result.budgets, function(key, value){

      console.log('setting')
      $('#budgetsSelect').append( $('<option>', {value: value}).text(key));
    })

    // Need to set the values for categories
  })

  // Checks validity of token entered and stores budgets
  tokenBtn.click(()=> {
    tokenVal = $("#tokenInput").val()
    
    port.postMessage({
      subject: "validate PAT",
      token: tokenVal
    });

  });

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
