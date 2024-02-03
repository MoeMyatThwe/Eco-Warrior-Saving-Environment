//Moe Myat Thwe 2340362 DIT FT 1B 05
  document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('userId')
    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const UserId = document.getElementById("UserProfile");

        if (responseStatus == 404) {
            UserId.innerHTML = `${responseData.message}`;
            return;
        }else if(responseStatus == 401){
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }

            UserId.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                        User ID: ${responseData.user_id} <br>
                        User Name: ${responseData.username} <br>
                        Email : ${responseData.email}<br>
                        
                        
                    </p>
                   
                </div>
            </div>
            
        `;
        
    };

    fetchMethod(currentUrl + `/api/users/${userId}`, callbackForUserInfo , "GET", null, localStorage.getItem("token"));
});