/**
let pt;

let pt_input = document.getElementById('pt');
let submit = document.getElementById('submit');
let selectBudget = document.getElementById("selectBudget");
let clearBtn = document.getElementById("clearBtn");


clearBtn.onclick = () => {
  chrome.storage.local.clear();
  PTfield(false);
}

selectBudget.onchange = () => {
  var selected = selectBudget.options[selectBudget.selectedIndex].value;

  getStoredPT.then((data) => {

    var selectBudget = document.getElementById("select");
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        getBid(this.responseText, selected).then((value) => {
          chrome.storage.local.set({bid: value}, () => {
            console.log("set bid in storage to be: " + value);
          })
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
  run();
}


validPT = (potential) => {
  return typeof JSON.parse(potential)["data"] !== 'undefined';
}

PTfield = (value) => {
  console.log(value);
  submit.disable = value;
  pt_input.readOnly = value;
  if (!value) setSubmitTextField("");
}


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

*/


$('#setTokenBtn').click(() => {
  value = $('#token').val(); 

  validatePAT(value).then((data) => {
    console.log("wow");
    console.log(data);
  });
})

var validatePAT = (PAT) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        console.log(this.readyState);
        if (this.readyState === 4) {
          resolve(this.responseText);
        }
      });
      xhr.open("GET", "https://api.youneedabudget.com/v1/user");
      xhr.setRequestHeader("Authorization", "Bearer a7210a4dd1e40b3c52e1e11b8f877c6bb9afe0520a7f42c82f174b0b7d475bba");
      xhr.send(null);
    }, 3000);
  });
} 

/**
var getBudgets = (PAT) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', () => {
        console.log(this.readyState);
        if (this.readyState === 4) {
          console.log('here');
          resolve(this.responseText);
        }
      });
      xhr.open("GET", "https://api.youneedabudget.com/v1/budgets");
      xhr.setRequestHeader("Authorization", "Bearer a7210a4dd1e40b3c52e1e11b8f877c6bb9afe0520a7f42c82f174b0b7d475bba");
      xhr.send(null);
    }, 300);
  });
} 

var getCategories = function(PAT, budget_id) {
  return new Promise((resolve, reject) => {
    
    setTimeout(function(){

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', () => {
        if (this.readyState === 4) {
          resolve(this.responseText);
        }
      });
      uri = "https://api.youneedabudget.com/v1/budgets/" + budget_id + "/categories";
      xhr.open("GET", uri);
      xhr.setRequestHeader('Authorization', 'Bearer');
      xhr.send(null);
    }, 300);
  });
}

var getPayees = function(PAT, category_id) {
  return new Promise((resolve, reject) => {
    
    setTimeout(function(){

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', () => {
        if (this.readyState === 4) {
          resolve(this.responseText);
        }
      });
      uri = "https://api.youneedabudget.com/v1/budgets/" + category_id + "/payees";
      xhr.open("GET", uri);
      xhr.setRequestHeader('Authorization', 'Bearer');
      xhr.send(null);
    }, 300);
  });

}
*/
