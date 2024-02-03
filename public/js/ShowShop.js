//Moe Myat Thwe 2340362 DIT FT 1B 05
    document.addEventListener("DOMContentLoaded", function() {
    const callback = (responseStatus,responseData) => {
        console.log("responseData:", responseData);
      
        const shopList = document.getElementById("shopList");
        responseData.forEach((shop) => {
          const displayItem = document.createElement("div");
          displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
            <div class="card shop-item" data-item-id="${shop.item_id}">
              
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
      
        // Add event listeners to the "buy" buttons
        const buyButtons = document.querySelectorAll(".buy-button");
        buyButtons.forEach((button) => {
          button.addEventListener("click", handleBuyButtonClick);
        });
      };
      
      function handleBuyButtonClick(event) {
        const button = event.target;
        const shopItem = button.closest('.shop-item');
        const itemId = shopItem.dataset.itemId;
        const userId = getUserId();
        buyItem(itemId, userId);
      }
      
      function buyItem(itemId, userId) {
        if (!userId) {
          console.error('User ID not found');
          return;
        }
      

      const data = {
        item_id: itemId,
        user_id: userId
      };

        fetchMethod(currentUrl + `/api/magical_item_shop/${userId}`, callback,"POST",data,localStorage.getItem('token'));

      }
      
      function getUserId() {
        const userId = localStorage.getItem('userId');
        return userId;
      }
     
      fetchMethod(currentUrl + "/api/magical_item_shop", callback,"GET",null,localStorage.getItem('token'));
      });
