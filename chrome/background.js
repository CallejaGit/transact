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

    // API call to get validate the personal Tokken
    if (msg.subject == "validate PAT"){
      validatePAT(msg.token).then((response) => {
        port.postMessage({
          subject: "validated PAT",
          validation: response,
          token: msg.token
        });
      })
    }

    // API call to get budget of user
    if (msg.subject == "get budgets") {
      getBudgets(msg.token).then((response) => {
        console.log(response)
        port.postMessage({
          subject: "got budgets",
          json: response
        })
      });
    }

    // Set the budget in local storage
    if (msg.subject == "set budget_id") {

      chrome.storage.local.set({current_budget: msg.id}, () => {
        console.log("set msg.id as " + msg.id);
      });

      // Need to update table if displayed on page
      
      // Need to update categories
      console.log(msg.token, msg.id);
      getCategories(msg.token, msg.id).then((response) => {
        console.log(response.text);
      })
    }
  })
})
