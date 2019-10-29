let pt;

let pt_input = document.getElementById('pt');
let submit = document.getElementById('submit');
let selectBudget = document.getElementById("selectBudget");
let clearBtn = document.getElementById("clearBtn");

/**
 * Event Listeners
 */

clearBtn.onclick = () => {
  setSubmitTextField(" ");
  chrome.storage.local.clear();
  submit.disabled = false;
}

selectBudget.onchange = () => {
  getStoredPT.then((data) => {
    
    var selectBudget = document.getElementById("select");
    var selected = selectBudget.options[selectBudget.selectedIndex].value
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;selectForm

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        getBid(this.responseText, selected).then((bid) => {
          /**
           * TODO: bid should be used to parse 
           */
          parseJsonAccounts(bid);
        });
      }
    });

    xhr.open("GET", "https://api.youneedabudget.com/v1/budgets");
    xhr.setRequestHeader("Authorization", "Bearer " + data);
    xhr.send(null);

  });
}

submit.onclick = () => {
  pt_value = pt_input.value;
  chrome.storage.local.clear();
  chrome.storage.local.set({pt: pt_value}, () => {
    console.log('Value is set to ' + pt_value);
  });
}


/**
 * functions 
 */
var getBid = function(dat, b) {
  return new Promise((resolve, reject) => {
    var data = JSON.parse(dat)["data"]["budgets"];
    var bid;
    console.log("\nlooking for\n" + b +"\n");
    for (var i=0; ;i++) {
     
      if (typeof data[i] == 'undefined') { break; }
      console.log("is it...\n" + data[i]["name"]);
      console.log("if so then the bid is\n" + data[i]["id"]);

       /*
       * TODO: Error
       * 
       * Adding budget name to select form alters the string.
       * When grabbing the same budget name from the api is 
       * different then the string value in b passed in this
       * callback. 
       */
      

      if (data[i]["name"] == b) {
        console.log("FOUND IT");
        bid = data[i]["id"];      
      }
    }

    if(typeof bid !== 'undefined') {
      console.log("------------\nOkay it works you got bid\n" + bid);
      resolve(bid);
    } else { reject(Error("It broke"))};
  }); 
}


/**
 * Parsing functions
 */
parseJsonBudgets = (data) => {
  var data = JSON.parse(data)["data"]["budgets"];
  var select_option = document.createElement("option");
  select_option.text = "Select your Budget";

  selectBudget.add(select_option);
  console.log("parseJsonBudgets: Setting budgets");
  for (var i=0; ;i++) {
    if (typeof data[i] == 'undefined') { break; }
    console.log("grabbed from api... \n" + data[i]["name"]);
    var option = document.createElement("option");
    option.text = data[i]["name"];
    selectBudget.add(option);
    console.log("setting option... \n" + option.text);
  }
}

parseJsonAccounts = (data) => {
  var data = JSON.parse(data)["data"]["budgets"];
  for (var i=0; ;i++) {
    if (typeof data[i] == 'undefined') { break; }
    var option = document.createElement("option");
    option.text = data[i]["name"];
    console.log("Setting options: " + data[i]["name"]);

    selectBudget.add(option);
  }
}

var getStoredPT = new Promise(function(resolve, reject){
  setTimeout(function(){
    chrome.storage.local.get(['pt'], (result) => {
      if (chrome.runtime.lastError || typeof result.pt == 'undefined') {
        return;
      }
      setSubmitTextField(result.pt);
      resolve(result.pt)
    });
  }, 300);
});

setSubmitTextField = (pt) => {
  pt_input.value = pt;
}

/**
 * Main
 */
getStoredPT.then((data) => {

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      parseJsonBudgets(this.responseText);
    }
  });
  console.log(data);
  xhr.open("GET", "https://api.youneedabudget.com/v1/budgets");
  xhr.setRequestHeader("Authorization", "Bearer " + data);
  xhr.send(null);
});



