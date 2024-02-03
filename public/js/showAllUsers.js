//Moe Myat Thwe 2340362 DIT FT 1B 05
  document.addEventListener("DOMContentLoaded", function() {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const usersList = document.getElementById("usersList");
        responseData.forEach((user) => {
          const displayItem = document.createElement("div");
          displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
          displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${user.username}</h5>
                      <p class="card-text">
                          User ID: ${user.user_id} <br>
                          Username: ${user.username} <br>
                          Email: ${user.email} <br>
                          
                      </p>
                     ${
                       user.user_id == localStorage.getItem("userId") ? 
                       ` <a href="singleUserInfo.html?user_id=${user.user_id}" class="btn btn-primary">View Details</a>`
                       :
                       ``
                     }
                  </div>
              </div>
          `;
          usersList.appendChild(displayItem);
        });
      };
      
      fetchMethod(currentUrl + "/api/users", callback,"GET",null,localStorage.getItem('token'));
  }
  )