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

function treadRowData(id, transactionsTable) {


  var tableElem = transactionsTable.getElementsByTagName('td');


  var data = { 
    date: tableElem[0].textContent.split(/\r?\n/)[5].trim(),
    payee_name: tableElem[1].textContent.split(/\r?\n/)[1].trim(),
    debit: tableElem[2].textContent.split(/\r?\n/)[2].trim(),
    credit: tableElem[3].textContent.split(/\r?\n/)[0].trim(),
    balance: tableElem[4].textContent.split(/\r?\n/)[0].trim(),
    id: id 
  };
  return data;
}

function initSemanticUI() {

  $(document.head).append(`
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
<script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
  `);

}

function insertTable() {
  $("#transactionsTable").replaceWith(`
    <table id="ynabTable" class="ui blue table">
      <thread>
        <tr>
          <th>DATE</th>
          <th>PAYEE</th>
          <th>CATEGORY</th>
          <th>MEMO</th>
          <th>OUTFLOW</th>
          <th>INFLOW</th>
          <th></th>
        </tr>
      </thread>
      <tbody>
      </tbody>
        <tfoot class="full-width">
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
              <th colspan="6">
              <div class="ui small blue button">
                Approve
              </div>
              <div class="ui small blue disabled button">
                Approve All
              </div>
            </th>
          </tr>
        </tfoot>
    </table>
  
  `);
  return $("#ynabTable");
}

function fillTable(ynabTable, transactions) {

  var ynabBody = ynabTable.find('tbody').first();
 

  /**
   * TODO: Bug when setting payee_name to the placeholder
   *
   * It takes the first word of the string as the value.
   */
  transactions.forEach((arrItem) => {
    ynabBody.append(`
    <tr id=${'ynabTrans' + arrItem.id}>
      <td style="padding:10px"; style="margin:0px" id="date"></td>
      <td>
        <div class="ui input">
          <input type="text" placeholder="" value=${arrItem.payee_name} id="payee_name">
        </div>
      </td>
      <td style="padding:10px"; style="margin:0px">
        <div class="ui input">
          <input type="text" placeholder="" id="category">
        </div>
      </td>
      <td style="padding:10px"; style="margin:0px">
        <div class="ui input">
          <input type="text" placeholder="memo" id="memo">
        </div>
      </td>
      <td style="padding:10px"; style="margin:0px">
        <div class="ui input">
          <label for="amount" class="ui label">$</label>
          <input style="width:90px"; type="text" placeholder="outflow" id="outflow">
        </div>
      </td>
      <td style="padding:10px"; style="margin:0px">
        <div class="ui input">
          <label for="amount" class="ui label">$</label>
          <input style="width:90px"; type="text" placeholder="inflow" id="inflow">
        </div>
      </td>
      <td style="padding: 0px"; style="margin:0px" class="collapsing">
        <div class="ui fitted toggle checkbox">
          <input type="checkbox"> <label></label>
        </div>
      </td>
    </tr>
    `);
  
    console.log(arrItem.debit !== "");
    console.log(arrItem.debit)
    
    if (arrItem.credit !== "") {
      var i = '#ynabTrans' + arrItem.id;
      $(i).find('#outflow').attr("value", arrItem.credit);
    } else if (arrItem.debit !== "") {
      console.log('inside else')
      var i = '#ynabTrans' + arrItem.id;
      $(i).find('#inflow').attr("value", arrItem.debit);
    }

  });
}

function main() {
  var transactionsTable  = document.getElementById('transactionsTable').getElementsByTagName('tr');

  var transactions = [];
  // 3rd element begins the row and last element is total
  var isPosted = false;
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


