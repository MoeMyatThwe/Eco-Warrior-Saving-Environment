document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const userId = urlParams.get("user_id");

  const callbackForUserInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const userInfo = document.getElementById("userInfo");

    if (responseStatus == 404) {
      userInfo.innerHTML = `${responseData.message}`;
      return;
    }

    userInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                User ID: ${responseData.user_id} <br>
                    Username: ${responseData.username} <br>
                    Email: ${responseData.email} 
                    
                </p>
            </div>
        </div>
    `;
  };

  fetchMethod(currentUrl + `/api/users/${userId}`, callbackForUserInfo);
});