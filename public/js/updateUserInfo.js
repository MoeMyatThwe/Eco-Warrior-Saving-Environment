// document.addEventListener("DOMContentLoaded", function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get("user_id");

//     fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
//         if (responseStatus === 200) {
//             createUpdateForm(responseData);
//         } else {
//             console.error("Error fetching user details:", responseStatus);
//         }
//     });
// });

// function createUpdateForm(userDetails) {
//     const updateUserInfoContainer = document.getElementById("updateUserInfoContainer");

//     // Create form elements dynamically
//     const form = document.createElement("form");
//     form.id = "updateUserForm";
//     form.innerHTML = `
//         <label for="username">Username:</label>
//         <input type="text" id="username" name="username" value="${userDetails.username}" required><br>

//         <label for="email">Email:</label>
//         <input type="email" id="email" name="email" value="${userDetails.email}" required><br>

//         <label for="password">New Password:</label>
//         <input type="password" id="password" name="password" placeholder="Enter new password"><br>

//         <label for="confirmPassword">Confirm Password:</label>
//         <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password"><br>

//         <button id="saveChangesBtn" class="btn btn-primary">Save Changes</button>
//     `;
//     // Append the form to the container
//     updateUserInfoContainer.innerHTML = ''; // Clear previous content
//     updateUserInfoContainer.appendChild(form);

//     // Add event listener to the "Save Changes" button
//     const saveChangesBtn = document.getElementById("saveChangesBtn");
//     saveChangesBtn.addEventListener("click", saveUpdatedUserInfo);
// }

// function saveUpdatedUserInfo() {
//     // Retrieve updated user details from the form
//     const updatedUsername = document.getElementById("username").value;
//     const updatedEmail = document.getElementById("email").value;
//     const newPassword = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;

//     // Check if passwords match
//     if (newPassword !== confirmPassword) {
//         console.error("Passwords do not match");
//         // Handle error, show error message, etc.
//         return;
//     }
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get("user_id");

//     // Create an object with the updated user details
//     const updatedUserData = {
//         username: updatedUsername,
//         email: updatedEmail,
//         // Add other fields as needed
//     };

//     // Send updated user details to the server
//     fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
//         if (responseStatus === 200) {
//             console.log("User info updated:", responseData);
//             // You can add additional logic or UI changes after updating the user info if needed
//             // Redirect to the user details page or any other page as needed
//             window.location.href = `/singleUserInfo.html?user_id=${userId}`;
//         } else {
//             console.error("Error updating user info:", responseStatus);
//             // Handle errors, show error messages, etc.
//         }
//     }, "PUT", updatedUserData);
// }

////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");

    fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
        if (responseStatus === 200) {
            createUpdateForm(responseData);
        } else {
            console.error("Error fetching user details:", responseStatus);
        }
    });
});

function createUpdateForm(userDetails) {
    const updateUserInfoContainer = document.getElementById("updateUserInfoContainer");

    // Create form elements dynamically
    const form = document.createElement("form");
    form.id = "updateUserForm";
    form.innerHTML = `
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" value="${userDetails.username}" required><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${userDetails.email}" required><br>

        <label for="password">New Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter new password"><br>

        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password"><br>

        
    `;
    // Append the form to the container
    updateUserInfoContainer.innerHTML = ''; // Clear previous content
    updateUserInfoContainer.appendChild(form);

    // Add event listener to the "Save Changes" button
    const saveChangesBtn = document.getElementById("saveChangesBtn");
    saveChangesBtn.addEventListener("click", saveUpdatedUserInfo);
}

function saveUpdatedUserInfo() {
    // Retrieve updated user details from the form
    const updatedUsername = document.getElementById("username").value;
    const updatedEmail = document.getElementById("email").value;
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        console.error("Passwords do not match");
        // Handle error, show error message, etc.
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");

    // // Create an object with the updated user details
    // const updatedUserData = {
    //     username: updatedUsername,
    //     email: updatedEmail,
    //     // Add other fields as needed
    // };

    // Create an object with the updated user details
    const updatedUserData = {};

    // Include fields in the object only if they are provided
    if (updatedUsername) {
        updatedUserData.username = updatedUsername;
    }

    if (updatedEmail) {
        updatedUserData.email = updatedEmail;
    }

    if (newPassword) {
        updatedUserData.password = newPassword;
    }
    
    // Send updated user details to the server
    fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("User info updated:", responseData);
            // You can add additional logic or UI changes after updating the user info if needed
            // Redirect to the user details page or any other page as needed
            // window.location.href = `/singleUserInfo.html?user_id=${userId}`;
            window.location.href = "users.html";
        } else {
            console.error("Error updating user info:", responseStatus);
            // Handle errors, show error messages, etc.
        }
    }, "PUT",updatedUserData); // Include the request method ("PUT") here
}

