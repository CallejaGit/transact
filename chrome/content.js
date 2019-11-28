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
var port = chrome.extension.connect({
  name: "Sample Communication"
});

port.onMessage.addListener(function(msg) {

  console.log(msg)
  if (msg.subject == "got categories") {
    console.log(msg.json);
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


