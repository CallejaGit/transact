let pt;

let pt_input = document.getElementById('pt');
let submit = document.getElementById('submit');

function setSubmitTextField(pt_value) { 
  pt_input.value = pt_value;
}

chrome.storage.local.get(['pt'], (result) => {
  if (chrome.runtime.lastError) {
    return;
  }
  setSubmitTextField(result.pt);
});

submit.onclick = () => {
  pt_value = pt_input.value;
  chrome.storage.local.clear();
  chrome.storage.local.set({pt: pt_value}, () => {
    console.log('Value is set to ' + pt_value);
  });
}



// Getting data
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    parseJson(this.responseText);
  }
});
xhr.open("GET", "https://api.youneedabudget.com/v1/budgets");
xhr.setRequestHeader("Authorization", "Bearer a7210a4dd1e40b3c52e1e11b8f877c6bb9afe0520a7f42c82f174b0b7d475bba");
xhr.send(null);

function parseJson(data) {
  var budgets = JSON.parse(data)["data"]["budgets"];
  
};


