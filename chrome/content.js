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
}, 2000);
/**
 * TODO: ----Overview Objectives----
 * Replace Dates with input as the current date
 * Replace Transaction Descriptions to input form
 * Same with Debit and Balance
 * Add a checkmark button
 * Once Button is set it will 
 * */

function tread(transactionsTable) {
 
  /**
  var date = transactionsTable.getElementsByTagName('td')[0].textContent;
  var transDesc = transactionsTable.getElementsByTagName('td')[1].textContent;
  var debit = transactionsTable.getElementsByTagName('td')[2].textContent;
  var credit = transactionsTable.getElementsByTagName('td')[3].textContent;
  var balance = transactionsTable.getElementsByTagName('td')[4].textContent;

  var dateStr = date.split(/\r?\n/)[5]; // has white space before date
  var transDescStr = transDesc.split(/\r?\n/)[1];
  var debitStr = debit.split(/\r?\n/)[2];
  var creditStr = credit.split(/\r?\n/)[0];
  var balanceStr = balance.split(/\r?\n/)[0];
  console.log(date);
  */
  
  var headers = ["date", "payee_name", "debit", "credit", ""];
  var tableElem = transactionsTable.getElementsByTagName('td');

  for (var i = 0, len = tableElem.length; i < len; i++) {
    var input = document.createElement("INPUT"); 
    input.setAttribute("type", "text");
    tableElem[i].appendChild(input);
  }
  /** NTS: use datalist */
  
}

function main() {
  var transactionsTable  = document.getElementById('transactionsTable').getElementsByTagName('tr');


  // 3rd element begins the row and last element is total
  for (var i = 3, len = transactionsTable.length - 1; i < len; i++) {
    tread(transactionsTable[i]);
  }
}
