////update info doesn't work part
// document.addEventListener("DOMContentLoaded", function () {
//   url = new URL(document.URL);
//   const urlParams = url.searchParams;
//   const userId = urlParams.get("user_id");

//   const callbackForUserInfo = (responseStatus, responseData) => {
//     console.log("responseStatus:", responseStatus);
//     console.log("responseData:", responseData);

//     const userInfo = document.getElementById("userInfo");

//     if (responseStatus == 404) {
//       userInfo.innerHTML = `${responseData.message}`;
//       return;
//     }

//     userInfo.innerHTML = `
//         <div class="card">
//             <div class="card-body">
//                 <p class="card-text">
//                 User ID: ${responseData.user_id} <br>
//                     Username: ${responseData.username} <br>
//                     Email: ${responseData.email} 
                    
//                 </p>
//             </div>
//         </div>
//     `;
//   };

//   fetchMethod(currentUrl + `/api/users/${userId}`, callbackForUserInfo);
// });

// /////////////////////////////////

// document.addEventListener("DOMContentLoaded", function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get("user_id");
  
//     // Fetch user details and populate the user info
//     fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
//       if (responseStatus === 200) {
//         createUserInfo(responseData);
//       } else {
//         console.error("Error fetching user details:", responseStatus);
//       }
//     });
  
//     // Add event listener to the "Update Info" button
//     const updateInfoBtn = document.getElementById("updateInfoBtn");
//     updateInfoBtn.addEventListener("click", redirectToUpdatePage);
//   });
  
//   function createUserInfo(userData) {
//     const userInfoContainer = document.getElementById("userInfo");
  
//     // Create user info elements dynamically
//     const userInfoDiv = document.createElement("div");
//     userInfoDiv.className = "card";
//     userInfoDiv.innerHTML = `
//       <div class="card-body">
//         <p class="card-text">
//           User ID: ${userData.user_id} <br>
//           Username: ${userData.username} <br>
//           Email: ${userData.email} 
//         </p>
//       </div>
//     `;
  
//     // Add "Update Info" button
//     const updateInfoBtn = document.createElement("button");
//     updateInfoBtn.id = "updateInfoBtn";
//     updateInfoBtn.className = "btn btn-primary";
//     updateInfoBtn.innerText = "Update Info";
  
//     userInfoDiv.querySelector(".card-body").appendChild(updateInfoBtn);
  
//     // Append the user info to the container
//     userInfoContainer.innerHTML = ''; // Clear previous content
//     userInfoContainer.appendChild(userInfoDiv);
//   }
  
//   function redirectToUpdatePage() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get("user_id");
  
//     // Redirect to the update user page with the user ID
//     window.location.href = `/updateUserInfo.html?user_id=${userId}`;
//   }
  

///////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const userInfoContainer = document.getElementById("userInfo");

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");

    fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
        if (responseStatus === 200) {
            createUserInfo(responseData);
        } else {
            console.error("Error fetching user details:", responseStatus);
        }
    });

    function createUserInfo(userDetails) {
        const userInfo = document.createElement("div");
        userInfo.className = "card";
        userInfo.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${userDetails.username}</h5>
                <p class="card-text">
                    User ID: ${userDetails.user_id} <br>
                    Username: ${userDetails.username} <br>
                    Email: ${userDetails.email} 
                </p>
                <button class="btn btn-success" onclick="updateUserInfo(${userDetails.user_id})">Update Info</button>
            </div>
        `;

        // Add event listener to the "Update Info" button
        const updateInfoButton = userInfo.querySelector(".btn-success");
        updateInfoButton.addEventListener("click", () => {
            updateUserInfo(userDetails.user_id);
        });

        userInfoContainer.appendChild(userInfo);
    }

    function updateUserInfo(userId) {
        window.location.href = `updateUserInfo.html?user_id=${userId}`;
    }

    window.updateUserInfo = updateUserInfo;
});
