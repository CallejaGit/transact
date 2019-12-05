
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


  chrome.storage.local.get(['categories'], (result) => {
    console.log(result)
  })
  initSemanticUI();
  var ynabTable = insertTable();
  fillTable(ynabTable, transactions);
  categoriesDropdown();
  accountDropdown();
  initApproval();
  sendReq();
}

/**
 * Validates proper requirements to send a POST request
 */
function sendReq() {
  $('.categoriesDropdown').change(() => {
    properSelected = $(event.target).find('option:selected').text() != "Select your category"

    tr = $(event.target).parent().closest('tr').find('input')

    var date = tr[0].value;
    var payee_name = tr[1].value;
    var memo = tr[2].value;
    var outflow = tr[3].value;
    var inflow = tr[4].value;
    
    if ((date != "") && (payee_name != "") && (outflow != "" || inflow != "") && properSelected ) {
      $(tr[5]).attr('disabled', false)
    } else {
      $(tr[5]).click()
      $(tr[5]).attr('disabled', true)
    }
  })
}

/**
 * Gathers the inputs from user and sends it to YNAB
 */
function initApproval() {
  $("input[type='checkbox']").click(() => {
    tr = $(event.target).parent().closest('tr').find('input');

    console.log(tr)
    
    var date = tr[0].value;
    var payee_name = tr[1].value;
    var memo = tr[2].value;
    var outflow = tr[3].value;
    var inflow = tr[4].value;

    tr = $(event.target).parent().closest('tr').find('select');
    console.log(tr[0].value);

  })
}


chrome.storage.local.get(['TD'], (result) => {
  
  if ((document.title === 'EasyWeb') && (result.TD === true)) {
    main();
  }
})



