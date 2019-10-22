// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({color: item}, function() {
//         console.log('color is ' + item);
//       })
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

let pt;

let pt_input = document.getElementById('pt');
let submit = document.getElementById('submit');


chrome.storage.local.get(['pt'], function(result) {
  if (chrome.runtime.lastError){
    return;
  }
  console.log('Value is set to ' + result.pt);
  setSubmitTextField(result.pt, submit);
});

submit.onclick = () => {
  pt_value = pt_input.value;
  chrome.storage.local.clear();
  chrome.storage.local.set({pt: pt_value}, function() {
    console.log('Value is set to ' + pt_value);
  });
};

function setSubmitTextField(pt_value, submit_input) { 
  console.log(pt_value, submit_input);
  pt_input.value = pt_value;
};
