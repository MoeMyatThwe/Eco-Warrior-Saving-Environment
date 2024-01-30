
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const shopList = document.getElementById("shopList");
    responseData.forEach((shop) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              
              <div class="card-body">
                  <h5 class="card-title">${shop.name}</h5>
                  <p class="card-text">
                      Item Id: ${shop.item_id} <br>
                      Item Name: ${shop.name} <br>
                      Description: ${shop.description}<br>
                      Price: ${shop.price}
                      
                  </p>
              </div>
          </div>
          `;
      shopList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/magical_item_shop", callback);