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

function treadRowData(transactionsTable) {

  var tableElem = transactionsTable.getElementsByTagName('td');

  var data = { 
    date: tableElem[0].textContent.split(/\r?\n/)[5].trim(),
    payee_name: tableElem[1].textContent.split(/\r?\n/)[1].trim(),
    debit: tableElem[2].textContent.split(/\r?\n/)[2].trim(),
    credit: tableElem[3].textContent.split(/\r?\n/)[0].trim(),
    balance: tableElem[4].textContent.split(/\r?\n/)[0].trim(),
  };
  return data;
  /**
  for (var i = 0, len = tableElem.length; i < len; i++) {
    if (data[i]){
      var input = document.createElement("INPUT"); 
      input.setAttribute("type", "text");
      input.value = data[i];
      tableElem[i].appendChild(input);
    }
  }
  /** 
   * NTS: 
   * use datalist to populate this list
   * add a button
   * select category
   * 
   */

}

function initBootstrap() {

  var head = document.head;
  var link = document.createElement('link');

  var script = document.createElement('script');
  var script2 = document.createElement('script');
  var script3 = document.createElement('script');

  // CSS
  link.rel = "stylesheet";
  link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
  link.setAttribute("integrity", "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T");
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);

  // JS
  script.src = "https://code.jquery.com/jquery-3.3.1.slim.min.js";
  script.setAttribute("integrity", "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo");
  script.crossOrigin = "anonymous";
  document.appendChild(script);
  script2.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js";
  script2.setAttribute("integrity", "sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1");
  script2.crossOrigin = "anonymous";
  document.appendChild(script2);
  script3.rel = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js";
  script3.setAttribute("integrity", "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM");
  script3.crossOrigin = "anonymous";
  document.appendChild(script3);
}

function main() {
  var transactionsTable  = document.getElementById('transactionsTable').getElementsByTagName('tr');

  var transactions = [];
  // 3rd element begins the row and last element is total
  for (var i = 3, len = transactionsTable.length - 1; i < len; i++) {
    transactions.push(treadRowData(transactionsTable[i]));
  }
  
  initBootstrap();
}


