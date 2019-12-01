// TODO: try to insert this table back with switch is off
/**
storeTable = (title, table) => {
  if (title === 'EasyWeb') {
    var transTable = $('#transactionsTable')

    chrome.storage.local.set({TDtable: transTable}, (result) => {
    })
  }
}

*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.subject == "got categories") {
    json = message.body
    var data = JSON.parse(json)["data"]["category_groups"];
    console.log(data)

    chrome.storage.local.set({categories: data}, () => {
      console.log("setting categories as: \n" + data)
    })
  }
});


function main() {

  var transactionsTable  = document.getElementById('transactionsTable').getElementsByTagName('tr');

  var transactions = [];
  // 3rd element begins the row and last element is total
  var isPosted = false;
  
  console.log(transactionsTable.length);
  for (var i = 2, len = transactionsTable.length - 1; i < len; i++) {
    content = transactionsTable[i].textContent.trim().split('\n')[0];
    
    if ((content !== "Posted Transactions") && 
        (content !== "Pending Transactions") && 
        (content !== "") &&
        (content !== "There are no posted transactions for the selected period.")) {
      transactions.push(treadRowData(i-3, transactionsTable[i]));
    }
  }

  initSemanticUI();
  var ynabTable = insertTable();
  fillTable(ynabTable, transactions);
}


chrome.storage.local.get(['TD'], (result) => {
  
  if ((document.title === 'EasyWeb') && (result.TD === true)) {
    main();
  }
})



