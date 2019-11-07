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
  
  var date = transactionsTable.getElementsByTagName('td')[0].textContent;
  console.log(date);

}

function main() {
  var transactionsTable  = document.getElementById('transactionsTable').getElementsByTagName('tr');

  // 3rd element begins the row
  for (var i = 3, len = transactionsTable.length; i < len; i++) {
    if (i==3) {
      tread(transactionsTable[i]);
    }
  }
}
