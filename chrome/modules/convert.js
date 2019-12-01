/**
 * Contains all the functions necessary to build a ynabTable
 */
function fillTable(ynabTable, transactions) {

  var ynabBody = ynabTable.find('tbody').first();
 
  transactions.forEach((arrItem) => {
    var date = formatDate(arrItem.date);
    ynabBody.append(`
    <tr id=${'ynabTrans' + arrItem.id}>
      <td style="padding:10px"; style="margin:0px">
        <div class="ui input">
          <input style="width:100px"; type="text" value="${date}" placeholder="date" id="date">
        </div>
      </td>
      <td>
        <div class="ui input">
          <input type="text" placeholder="" value="${arrItem.payee_name}" id="payee_name">
        </div>
      </td>
      <td style="padding:10px"; style="margin:0px">
        <select class="ui dropdown categoriesDropdown">
          <option value="">Select your category</option>
        </select>
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

function formatDate(date) {

  console.log(date.split(' '));

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var components = date.split(' ');

  var month = parseInt(months.indexOf(components[0])) + 1;
  var day = components[1].slice(0, components[1].length - 1);
  var year = components[2];

  return year + "-" + month + "-" + day;
  
}

function insertTable() {

  $("#transactionsTable").replaceWith(`
    <table id="ynabTable" class="ui inverted teal table">
      <thread>
        <tr>
          <th colspan="6">
            <div class="ui compact menu">
              <div class="ui simple dropdown item">
                Please select your account
                <i class="dropdown icon"></i>
                <div class="menu">
                </div>
              </div>
            </div>
          </th>
        </tr>
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
            </th>
          </tr>
        </tfoot>
    </table>
  
  `);
  return $("#ynabTable");
}

function categoriesDropdown(){

  chrome.storage.local.get(['categories'], function(data) {
    if (typeof data === 'undefined') {
      console.log('setCategoriesOption: local storaged returned undefined')
      return;
    } else {

      var data = JSON.parse(data.categories)["data"]["category_groups"];

      data.forEach((e,i) => {

        $('.categoriesDropdown').append(`
          <option value=\'${e.id}\'>${e.name}</options>
          `)
      })
  });
}

/**
 * Contains the functions specifically for TD easy web
 */


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
