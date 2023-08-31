const URL = "https://fakestoreapi.com/products";

const ORDER_BY_PROD_PRICE = "Precio";
let currentProductsArray = [];
let minPrice = undefined;
let maxPrice = undefined;
const container = document.getElementById('info');

document.addEventListener("DOMContentLoaded", () => {

  fetch(URL)
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    if(data.length > 0){
      currentProductsArray = data;
      showProducts();
      return true;
    };
  })
  .catch(error => {
    console.error("Error:", error);
  });
});

function showProducts() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
      let product = currentProductsArray[i];
  
      if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.price) >= minPrice)) &&
          ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.price) <= maxPrice))) {
        htmlContentToAppend += `
          <div class="col-4">
             <div class="card">
               <img src="${product.image}" class="card-img-top" alt="Foto ${product.title}">
               <div class="card-body">
                 <h5 class="card-title">${product.title}</h5>
                 <div>USD ${product.price}</div>
               </div>
             </div>
          </div>`;
      }
    }
    console.log(htmlContentToAppend);
    container.innerHTML = htmlContentToAppend;
  }


document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProducts();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
  minPrice = document.getElementById("rangeFilterCountMin").value;
  maxPrice = document.getElementById("rangeFilterCountMax").value;

  if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
      minPrice = parseInt(minPrice);
  }
  else{
      minPrice = undefined;
  }

  if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
      maxPrice = parseInt(maxPrice);
  }
  else{
      maxPrice = undefined;
  }

  showProducts();
});
