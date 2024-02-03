//Moe Myat Thwe 2340362 DIT FT 1B 05
document.addEventListener("DOMContentLoaded", function () {
    const userInfoContainer = document.getElementById("userInfo");

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");

    fetchMethod(currentUrl + `/api/users/${userId}`, createUserInfo, "GET", null, localStorage.getItem('token'));

    function createUserInfo(responseStatus,responseData) {
        const userInfo = document.createElement("div");
        userInfo.className = "card";
        userInfo.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${responseData.username}</h5>
                <p class="card-text">
                    User ID: ${responseData.user_id} <br>
                    Username: ${responseData.username} <br>
                    Email: ${responseData.email} 
                </p>
                <button class="btn btn-success" onclick="updateUserInfo(${responseData.user_id})">Update Info</button>
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
