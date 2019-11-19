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
  console.log("Connected ....");
  port.onMessage.addListener(function(msg) {
    console.log("msg recieved " + msg.token)
    if(msg.subject == "validate PAT"){
      validatePAT(msg.token).then((response) => {
        console.log(response)
        port.postMessage({
          subject: "validate PAT",
          validation: response
        });
      })
    }
  })
})
