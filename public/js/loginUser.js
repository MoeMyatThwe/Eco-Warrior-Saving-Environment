// document.addEventListener("DOMContentLoaded", function () {

//   // ///////////////MMT added //////////////////////
//   // const handleSuccessfulLogin = (userData) => {
//   //   // Extract relevant user information from the response
//   //   const userId = userData.userId;
//   //   const username = userData.username;

//   //   // Store userId and username in localStorage
//   //   localStorage.setItem("userId", userId);
//   //   localStorage.setItem("username", username);

//   //   // Redirect or perform any other necessary actions after successful login
//   //   window.location.href = "profile.html";
//   // };
//   // ///////////////////////////////////////////////////////////////////
//   const callback = (responseStatus, responseData) => {
//     console.log("responseStatus:", responseStatus);
//     console.log("responseData:", responseData);
//     if (responseStatus == 200) {
//       // Check if login was successful
//       if (responseData.token) {
//         // handleSuccessfulLogin(responseData.user);//////////////////////////////////////////MMT added
//         // Store the token in local storage
//         localStorage.setItem("token", responseData.token);
//         // Redirect or perform further actions for logged-in user
//         window.location.href = "profile.html";
//       }
//     } else {
//       warningCard.classList.remove("d-none");
//       warningText.innerText = responseData.message;
//     }
//   };

//   const loginForm = document.getElementById("loginForm");

//   const warningCard = document.getElementById("warningCard");
//   const warningText = document.getElementById("warningText");

//   loginForm.addEventListener("submit", function (event) {
//     console.log("loginForm.addEventListener");
//     event.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     const data = {
//       username: username,
//       password: password,
//     };
//     // Perform login request
//     fetchMethod(currentUrl + "/api/login", callback, "POST", data);

//     // Reset the form fields
//     loginForm.reset();
//   });
// });

////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    
    if (responseStatus == 200) {
      if (responseData.token) {
        // Store the token, userId, and username in localStorage
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.user.userId);
        localStorage.setItem("username", responseData.user.username);
        
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
    fetchMethod(currentUrl + "/api/login", callback, "POST", data);

    // Reset the form fields
    loginForm.reset();
  });
});
