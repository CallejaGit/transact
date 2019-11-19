/**
// TODO: try to insert this table back with switch is off
storeTable = (title, table) => {
  if (title === 'EasyWeb') {
    var transTable = $('#transactionsTable')

    chrome.storage.local.set({TDtable: transTable}, (result) => {
    })
  }
}

function main() {

  var transactionsTable  = document.getElementById('transactionsTable').getElementsByTagName('tr');

  storeTable($(document).find('title').text(), transactionsTable);
  var transactions = [];
  // 3rd element begins the row and last element is total
  var isPosted = false;
  
  console.log(transactionsTable.length);
  for (var i = 2, len = transactionsTable.length - 1; i < len; i++) {
    
    if (isPosted) {
      transactions.push(treadRowData(i-3, transactionsTable[i]));
    } else if (transactionsTable[i].textContent.trim().split('\n')[0] == "Posted Transactions") {
      isPosted = true;
      i++;
    }
  }

  initSemanticUI();
  var ynabTable = insertTable();
  fillTable(ynabTable, transactions);
}


chrome.storage.local.get(['TD'], (result) => {
  if (($(document).find("title").text() === 'EasyWeb') && (result.TD === true)) {
    main();
  }
})
*/

PAT = 'a7210a4dd1e40b3c52e1e11b8f877c6bb9afe0520a7f42c82f174b0b7d475bba';

chrome.runtime.sendMessage({subject: "Validate PAT", token: PAT}, function(response) {
  console.log("this is the respones.........." + response);
});
