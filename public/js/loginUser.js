// Moe Myat Thwe 2340362 DIT FT 1B 05
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    
    if (responseStatus == 200) {
      if (responseData.token) {
        // Store the token, userId, and username in localStorage
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.user_id);
        localStorage.setItem("username", responseData.username);
        
        // Redirect or perform further actions for logged-in user
        window.location.href = "profile.html";
      }
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  const loginForm = document.getElementById("loginForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
      username: username,
      password: password,
    };

    // Perform login request
    fetchMethod(currentUrl + "/api/login", callback, "POST", data,localStorage.getItem('token'));


    // Reset the form fields
    loginForm.reset();
  });
});
