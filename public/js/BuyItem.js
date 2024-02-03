// //Moe Myat Thwe 2340362 DIT FT 1B 05

// document.addEventListener("DOMContentLoaded", function () {
//     const BuyItemList = document.getElementById("BuyItemList");
//     const urlParams = new URLSearchParams(window.location.search);
//         const item_id = urlParams.get('item_id');
  
  
       
//    // const userId = localStorage.getItem('userId')
//     const callback = (responseStatus, responseData) => {
//         console.log("responseStatus:", responseStatus);
//         console.log("responseData:", responseData);
  
//         if (responseStatus == 404) {
//             BuyItemList.innerHTML = `${responseData.message}`;
//             return;
//         }
  
   
//         BuyItemList.innerHTML = `
//             <div class="card">
//                 <div class="card-body">
//                     <p class="card-text">
//                         Iventory ID: ${responseData.inventory_id} <br>
//                         Item ID: ${responseData.item_id} <br>
//                         Item Name: ${responseData.name} <br> 
//                         Item Description : ${responseData.description} <br>
//                         User ID : ${responseData.user_id} <br>
//                         Username : ${responseData.username}<br>
                                       
//                     </p>
                   
//                 </div>
//             </div>
            
//         `;
        
//     };
  
//     fetchMethod(currentUrl + `/api/task_progress/${task_id}`, callback, "GET", null, localStorage.getItem('token'));
        
  
//   });