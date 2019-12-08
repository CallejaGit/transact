
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
  $('#accountDropdown').change(() => {
    validParams()
  })
  $('.categoriesDropdown').change(() => {
    validParams()
  })
}

function validParams() {
  console.log('inside validParams')

  properSelected = $('.categoriesDropdown').find('option:selected').text() != "Select your category"

  tr = $('.categoriesDropdown').parent().closest('tr').find('input')

  var date = tr[0].value;
  var payee_name = tr[1].value;
  var memo = tr[2].value;
  var outflow = tr[3].value;
  var inflow = tr[4].value;

  var account_id = $('#accountDropdown').val();
  
  if ((account_id != "") && (date != "") && (payee_name != "") && (outflow != "" || inflow != "") && properSelected ) {
    $(tr[5]).attr('disabled', false)
  } else {
    if ($(tr[5]).prop("checked")) $(tr[5]).click();
    $(tr[5]).attr('disabled', true)
  }
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
    var category_id = tr[0].value;
    var flow = null; 

    if (outflow != "") {
      console.log("inflow is empty")
      flow = convertFlow(outflow, "outflow")
    } else if (inflow != "") {
      console.log("outflow is empty")
      flow = convertFlow(inflow, "inflow")
    }

    var obj = `{
      "transaction": {
        "account_id": "",
        "date": "${date}",
        "amount": ${flow} ,
        "payee_id": null,
        "payee_name": "${payee_name}",
        "category_id": "${category_id}",
        "memo": "${memo}",
        "cleared": "cleared",
        "approved": true,
        "flag_color": null,
        "import_id": null
      }
    }`

    console.log(obj)
  })
}

function convertFlow(flow, type) {
  console.log("This is recieved " + flow);
  newFlow = flow.split(".")[0] + flow.split(".")[1] + "0";
  if (type == "outflow") {
    newFlow = "-" + newFlow;
  }
  console.log(newFlow)
  return newFlow
}


chrome.storage.local.get(['TD'], (result) => {
  
  if ((document.title === 'EasyWeb') && (result.TD === true)) {
    main();
  }
})

