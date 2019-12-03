/**
 * These functions help working with the api.youneedabudget.com endpoints
 */


var validatePAT = (PAT) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          if (this.status == 401) {
            resolve(false);
          } else if (this.status == 200){
            resolve(this.responseText);
          }
        }
      });
      xhr.open("GET", "https://api.youneedabudget.com/v1/user");
      xhr.setRequestHeader("Authorization", "Bearer " + PAT);
      xhr.send(null);
    }, 300);
  });
} 

var getBudgets = (PAT) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        console.log(this.readyState);
        if (this.readyState === 4) {
          console.log('here');
          resolve(this.responseText);
        }
      });
      xhr.open("GET", "https://api.youneedabudget.com/v1/budgets");
      xhr.setRequestHeader("Authorization", "Bearer " + PAT);
      xhr.send(null);
    }, 300);
  });
} 

var getAccounts = function(PAT, budget_id) {
  console.log("getAccounts called");
  return new Promise((resolve, reject) => {
    
    setTimeout(function(){

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log(this.responseText)
          resolve(this.responseText);
        }
      });
      uri = "https://api.youneedabudget.com/v1/budgets/" + budget_id + "/accounts";
      xhr.open("GET", uri);
      xhr.setRequestHeader('Authorization', 'Bearer ' + PAT);
      xhr.send(null);
    }, 300);
  });
}


var getCategories = function(PAT, budget_id) {
  console.log("getCategories called");
  return new Promise((resolve, reject) => {
    
    setTimeout(function(){

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log("WORKS");
          console.log(this.responseText)
          resolve(this.responseText);
        }
      });
      uri = "https://api.youneedabudget.com/v1/budgets/" + budget_id + "/categories";
      xhr.open("GET", uri);
      xhr.setRequestHeader('Authorization', 'Bearer ' + PAT);
      xhr.send(null);
    }, 300);
  });
}


var getPayees = function(PAT, category_id) {
  return new Promise((resolve, reject) => {
    
    setTimeout(function(){

      var xhr = new XMLHttpRequest();

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
