// Checking page title

/** 
 * I had troubles getting the transactions table from TD.
 * The document only contains a subset of the what is
 * displayed. I.e. console.log(document.getBody) inside of 
 * content scripts != the document.getBody execute from the
 * chrome console. 
 *
 * My hackish way is to delay the script and obtain the 
 * document
 */
setTimeout(function(){
  main();
}, 5000);

function main() {
  var transactionsTable  = document.getElementById('transactionsTable').getElementsByTagName('tr');

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


