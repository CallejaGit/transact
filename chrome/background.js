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

chrome.extension.onConnect.addListener(function(port){
  port.onMessage.addListener(function(msg) {

    if (msg.subject == "validate PAT"){
      validatePAT(msg.token).then((response) => {
        port.postMessage({
          subject: "validated PAT",
          validation: response,
          token: msg.token
        });
      })
    }

    if (msg.subject == "get budgets") {
      getBudgets(msg.token).then((response) => {
        console.log(response)
        port.postMessage({
          subject: "got budgets",
          json: response
        })
      });
    }
  })
})
