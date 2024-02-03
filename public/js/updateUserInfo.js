//Moe Myat Thwe 2340362 DIT FT 1B 05
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");

    fetchMethod(currentUrl + `/api/users/${userId}`,createUpdateForm, "GET", null, localStorage.getItem('token'));


function createUpdateForm(responseStatus, userDetails) {
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
  
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");


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
    updatedUserData.user_id = localStorage.getItem('user_id')
    
    //// Send updated user details to the server

    fetchMethod(currentUrl + `/api/users/${userId}`,saveUpdatedUserInfo,"PUT",updatedUserData,localStorage.getItem('token'));


}
});
