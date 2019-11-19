/**
 * These functions help working with the api.youneedabudget.com endpoints
 */


var validatePAT = (PAT) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

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