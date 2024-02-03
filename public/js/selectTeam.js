//Moe Myat Thwe 2340362 DIT FT 1B 05
let usersData = [];
// Add event listener to the team selection form
document.addEventListener("DOMContentLoaded", function() {

const teamSelectionForm = document.getElementById("teamSelectionForm");

teamSelectionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the selected team
  const selectedTeam = document.getElementById("team").value;
  teamSelectionForm.disabled = true;

    // Get existing usersData from local storage or initialize an empty array
    usersData = JSON.parse(localStorage.getItem("usersData")) || [];

    // Check if the user has already selected a team
    const existingUser = usersData.find(user => user.userId === localStorage.getItem("userId"));

    if (!existingUser) {
      // Add the user to the usersData array
      usersData.push({
        userId: localStorage.getItem("userId"),
        teamId: selectedTeam
      });

      // Update the table with the new data
      updateTable();

      // Store the updated usersData in local storage
      localStorage.setItem("usersData", JSON.stringify(usersData));
    }
  });

//   if(localStorage.getItem("selectedTeam")){
//     teamSelectionForm.disabled = true;
//   }else{
//   // Store the selected team in local storage
//   localStorage.setItem("selectedTeam", selectedTeam);
//   }

//   // Call the addUserToTable function to add the user to the respective team table
//   addUserToTable(selectedTeam);
// });

// // Create an array to store user data
// let usersData = [];

// // Function to add a user to the respective team table
// function addUserToTable(teamId) {
//   // Get the user ID from local storage
//   const userId = localStorage.getItem("userId");


//   // Create a new user object
//   const user = {
//     userId: userId,
//     teamId: teamId
//   };

//   // Add the user object to the usersData array
//   usersData.push(user);

//   // Update the table with the new data
//   updateTable();
// }

// Function to update the table with the user data
function updateTable() {
  // Get the table body for each team
  const team1TableBody = document.getElementById("team1TableBody");
  const team2TableBody = document.getElementById("team2TableBody");

  // Clear the table bodies
  team1TableBody.innerHTML = "";
  team2TableBody.innerHTML = "";

  // Loop through the usersData array and populate the tables
  usersData.forEach(function(user) {
    // Create a new table row
    const tableRow = document.createElement("tr");

    // Create table data cells for user ID, username, and selected team
    const userIdCell = document.createElement("td");
    const selectedTeamCell = document.createElement("td");

    // Set the text content of the table data cells
    userIdCell.textContent = user.userId;
    selectedTeamCell.textContent = user.teamId;

    // Append the table data cells to the table row
    tableRow.appendChild(userIdCell);
    tableRow.appendChild(selectedTeamCell);

    // Append the table row to the respective team table body
    if (user.teamId === "1") {
      team1TableBody.appendChild(tableRow);
    } else if (user.teamId === "2") {
      team2TableBody.appendChild(tableRow);
    }
  });
}

// Check if there is a selected team in local storage
const selectedTeam = localStorage.getItem("selectedTeam");
// if (selectedTeam) {
//   // Call the addUserToTable function to add the user to the respective team table
//   addUserToTable(selectedTeam);
// }
if (selectedTeam) {
  teamSelectionForm.disabled = true;
  updateTable();
}
});
//////////////////////////////////////////////////////////////////////////////////
