let pt;

let pt_input = document.getElementById('pt');
let submit = document.getElementById('submit');

function setSubmitTextField(pt_value) { 
  pt_input.value = pt_value;
}


submit.onclick = () => {
  pt_value = pt_input.value;
  chrome.storage.local.clear();
  chrome.storage.local.set({pt: pt_value}, () => {
    console.log('Value is set to ' + pt_value);
  });
}

// Getting data
let selectForm = document.getElementById("select");

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

getStoredPT.then((data) => {

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      parseJson(this.responseText);
    }
  });
  console.log(data);
  xhr.open("GET", "https://api.youneedabudget.com/v1/budgets");
  xhr.setRequestHeader("Authorization", "Bearer " + data);
  xhr.send(null);
});

function parseJson(data) {
  var data = JSON.parse(data)["data"]["budgets"];
  for (var i=0; ;i++) {
    if (typeof data[i] == 'undefined') { break; }
    var option = document.createElement("option");
    option.text = data[i]["name"];
    selectForm.add(option);
  }
}
