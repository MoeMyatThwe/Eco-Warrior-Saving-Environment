// document.addEventListener("DOMContentLoaded", function () {
//     const teamSelectionForm = document.getElementById("teamSelectionForm");
//     const warningCard = document.getElementById("warningCard");
//     const warningText = document.getElementById("warningText");
//     const teamUserTableBody = document.getElementById("teamUserTableBody");

//     teamSelectionForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         console.log("Form submitted");

//         const selectedTeam = document.getElementById("team").value;

//         // Placeholder team selection logic
//         if (selectedTeam) {
//             console.log("Team selected:", selectedTeam);
//             warningCard.classList.add("d-none");

//             // Get user information from localStorage
//             const userId = localStorage.getItem("userId");
//             const username = localStorage.getItem("username");

//             // Placeholder data for the fetch request
//             const data = {
//                 userId: userId,
//                 username: username,
//                 selectedTeam: selectedTeam,
//             };

//             // Placeholder fetch request for adding user to team
//             const callback = (responseStatus, responseData) => {
//                 console.log("responseStatus:", responseStatus);
//                 console.log("responseData:", responseData);
//                 if (responseStatus === 200) {
//                     // Check if team selection was successful
//                     // Redirect or perform further actions
//                     console.log("Team selection successful!");
//                     window.location.href = "profile.html";

//                     // Add user data to the table
//                     addUserToTable(selectedTeam, { userId, username });
//                 } else {
//                     warningCard.classList.remove("d-none");
//                     warningText.innerText = responseData.message;
//                 }
//             };

//             // Placeholder fetch request
//             fetchMethod(currentUrl + "/api/users/user_team", callback, "POST", data);
//         } else {
//             // No team selected, handle error
//             warningCard.classList.remove("d-none");
//             warningText.innerText = "Please select a team";
//         }
//     });

//     // Function to add user data to the table
//     function addUserToTable(team, userData) {
//         const row = document.createElement("tr");
//         const teamCell = document.createElement("td");
//         const userCell = document.createElement("td");

//         teamCell.textContent = team === "1" ? "Team Phoenix" : "Team Legends";
//         userCell.textContent = `${userData.username} (ID: ${userData.userId})`;

//         row.appendChild(teamCell);
//         row.appendChild(userCell);

//         teamUserTableBody.appendChild(row);
//     }
// });
////////////////////////////////
// document.addEventListener("DOMContentLoaded", function () {
//     const teamSelectionForm = document.getElementById("teamSelectionForm");
//     const warningCard = document.getElementById("warningCard");
//     const warningText = document.getElementById("warningText");
//     const teamUserTableBody = document.getElementById("teamUserTableBody");

//     teamSelectionForm.addEventListener("submit", async function (event) {
//         event.preventDefault();

//         console.log("Form submitted");

//         const selectedTeam = document.getElementById("team").value;

//         // Placeholder team selection logic
//         if (selectedTeam) {
//             console.log("Team selected:", selectedTeam);
//             warningCard.classList.add("d-none");

//             // Fetch team information based on team name
//             const teamId = await fetchTeamId(selectedTeam);

//             // Get user information from localStorage
//             const userId = localStorage.getItem("userId");
//             const username = localStorage.getItem("username");

//             // Include teamId in the data
//             const data = {
//                 userId: userId,
//                 username: username,
//                 selectedTeam: selectedTeam,
//                 teamId: teamId,
//             };

//             // Placeholder fetch request for adding user to team
//             const callback = async (responseStatus, responseData) => {
//                 console.log("responseStatus:", responseStatus);
//                 console.log("responseData:", responseData);
//                 if (responseStatus === 200) {
//                     // Check if team selection was successful
//                     // Redirect or perform further actions
//                     console.log("Team selection successful!");
//                     window.location.href = "profile.html";

//                     // Add user data to the table
//                     addUserToTable(selectedTeam, { userId, username });
//                 } else {
//                     warningCard.classList.remove("d-none");
//                     warningText.innerText = responseData.message;
//                 }
//             };

//             // Placeholder fetch request
//             fetchMethod(currentUrl + "/api/users/user_team", callback, "POST", data);
//         } else {
//             // No team selected, handle error
//             warningCard.classList.remove("d-none");
//             warningText.innerText = "Please select a team";
//         }
//     });

//     // Function to fetch teamId based on team name
//     async function fetchTeamId(teamName) {
//         // Placeholder logic to fetch teamId based on team name
//         // You may need to adjust this based on your actual API
//         const response = await fetch(currentUrl + "/api/teams", {
//             method: "GET",
//         });

//         const responseData = await response.json();

//         const team = responseData.find((team) => team.name === teamName);

//         return team ? team.id : null;
//     }

//     // Function to add user data to the table
//     function addUserToTable(team, userData) {
//         const row = document.createElement("tr");
//         const teamCell = document.createElement("td");
//         const userCell = document.createElement("td");

//         teamCell.textContent = team === "1" ? "Team Phoenix" : "Team Legends";
//         userCell.textContent = `${userData.username} (ID: ${userData.userId})`;

//         row.appendChild(teamCell);
//         row.appendChild(userCell);

//         teamUserTableBody.appendChild(row);
//     }
// });

// /////////////////
// document.addEventListener("DOMContentLoaded", function () {
//     const teamSelectionForm = document.getElementById("teamSelectionForm");
//     const warningCard = document.getElementById("warningCard");
//     const warningText = document.getElementById("warningText");
//     const teamUserTableBody = document.getElementById("teamUserTableBody");

//     teamSelectionForm.addEventListener("submit", async function (event) {
//         event.preventDefault();

//         console.log("Form submitted");

//         const selectedTeam = parseInt(document.getElementById("team").value);

//         // Placeholder team selection logic
//         if (selectedTeam) {
//             console.log("Team selected:", selectedTeam);
//             warningCard.classList.add("d-none");

//             // Fetch team information based on team name
//             const teamId = await fetchTeamId(selectedTeam);

//             // Get user information from localStorage
//             const userId = localStorage.getItem("userId");
//             const username = localStorage.getItem("username");

//             // Include teamId in the data
//             const data = {
//                 userId: userId,
//                 username: username,
//                 selectedTeam: selectedTeam,
//                 teamId: teamId,
//             };

//             // Placeholder fetch request for adding user to team
//             const callback = async (responseStatus, responseData) => {
//                 console.log("responseStatus:", responseStatus);
//                 console.log("responseData:", responseData);
//                 if (responseStatus === 200) {
//                     // Check if team selection was successful
//                     // Redirect or perform further actions
//                     console.log("Team selection successful!");
//                     window.location.href = "profile.html";

//                     // Add user data to the table
//                     addUserToTable(selectedTeam, { userId, username });
//                 } else {
//                     warningCard.classList.remove("d-none");
//                     warningText.innerText = responseData.message;
//                 }
//             };

//             // Placeholder fetch request
//             fetchMethod(currentUrl + "/api/users/user_team", callback, "POST", data);
//         } else {
//             // No team selected, handle error
//             warningCard.classList.remove("d-none");
//             warningText.innerText = "Please select a team";
//         }
//     });

//     // Function to fetch teamId based on team name
//     async function fetchTeamId(teamName) {
//         // Placeholder logic to fetch teamId based on team name
//         // You may need to adjust this based on your actual API
//         // const response = await fetch(currentUrl + "/api/team", {
//         //     method: "GET",
//         // });
//         const response = await fetch(currentUrl + "/api/team");

//         const responseData = await response.json();

//         const team = responseData.find((team) => team.team_name === teamName);

//         return team ? team.team_id : null;
//     }

//     // Function to add user data to the table
//     function addUserToTable(team, userData) {
//         const row = document.createElement("tr");
//         const teamCell = document.createElement("td");
//         const userCell = document.createElement("td");

//         teamCell.textContent = team === "1" ? "Team Phoenix" : "Team Legends";
//         userCell.textContent = `${userData.username} (ID: ${userData.userId})`;

//         row.appendChild(teamCell);
//         row.appendChild(userCell);

//         teamUserTableBody.appendChild(row);
//     }
// });


//////////////////////////////////
//kinda works

// document.addEventListener("DOMContentLoaded", function () {
//     const teamSelectionForm = document.getElementById("teamSelectionForm");
//     const warningCard = document.getElementById("warningCard");
//     const warningText = document.getElementById("warningText");
//     const teamUserTableBody = document.getElementById("teamUserTableBody");

//     // Retrieve userId and username from localStorage
//     const userId = localStorage.getItem("userId");
//     const username = localStorage.getItem("username");

//     teamSelectionForm.addEventListener("submit", async function (event) {
//         event.preventDefault();

//         console.log("Form submitted");

//         const selectedTeam = parseInt(document.getElementById("team").value);

//         // Logging for debugging
//         console.log("userId:", userId);
//         console.log("username:", username);
//         console.log("selectedTeam:", selectedTeam);

//         // Ensure that userId, username, and selectedTeam are available
//         if (userId && username && selectedTeam) {
//             console.log("Team selected:", selectedTeam);
//             warningCard.classList.add("d-none");

//             // Fetch team information based on team name
//             const teamId = await fetchTeamId(selectedTeam);

//             // Include userId, username, and teamId in the data
//             const data = {
//                 userId: userId,
//                 username: username,
//                 selectedTeam: selectedTeam,
//                 teamId: teamId,
//             };

//             // Placeholder fetch request for adding user to team
//             const callback = async (responseStatus, responseData) => {
//                 console.log("responseStatus:", responseStatus);
//                 console.log("responseData:", responseData);
//                 if (responseStatus === 200) {
//                     // Check if team selection was successful
//                     // Redirect or perform further actions
//                     console.log("Team selection successful!");
//                     window.location.href = "profile.html";

//                     // Add user data to the table
//                     addUserToTable(selectedTeam, { userId, username });
//                 } else {
//                     warningCard.classList.remove("d-none");
//                     warningText.innerText = responseData.message;
//                 }
//             };

//             // Placeholder fetch request
//             fetchMethod(currentUrl + "/api/users/user_team", callback, "POST", data);
//         } else {
//             // No team selected or missing userId/username, handle error
//             warningCard.classList.remove("d-none");
//             warningText.innerText = "Please select a team and ensure you are logged in.";
//         }
//     });

//     // Function to fetch teamId based on team name
//     async function fetchTeamId(teamName) {
//         // Placeholder logic to fetch teamId based on team name
//         // You may need to adjust this based on your actual API
//         const response = await fetch(currentUrl + "/api/team", {
//             method: "GET",
//         });

//         const responseData = await response.json();

//         const team = responseData.find((team) => team.name === teamName);

//         return team ? team.id : null;
//     }

//     // Function to add user data to the table
//     function addUserToTable(team, userData) {
//         const row = document.createElement("tr");
//         const teamCell = document.createElement("td");
//         const userCell = document.createElement("td");

//         teamCell.textContent = team === "1" ? "Team Phoenix" : "Team Legends";
//         userCell.textContent = `${userData.username} (ID: ${userData.userId})`;

//         row.appendChild(teamCell);
//         row.appendChild(userCell);

//         teamUserTableBody.appendChild(row);
//     }
// });

/////////////////


document.addEventListener("DOMContentLoaded", function () {
    const teamSelectionForm = document.getElementById("teamSelectionForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const teamUserTableBody = document.getElementById("teamUserTableBody");

    // Move the retrieval of userId and username inside the event listener
    teamSelectionForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        console.log("Form submitted");

        // Retrieve userId and username from localStorage
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");

        const selectedTeam = parseInt(document.getElementById("team").value);

        // Logging for debugging
        console.log("userId:", userId);
        console.log("username:", username);
        console.log("selectedTeam:", selectedTeam);

        // Ensure that userId, username, and selectedTeam are available
        if (userId && username && selectedTeam) {
            console.log("Team selected:", selectedTeam);
            warningCard.classList.add("d-none");

            // Fetch team information based on team name
            const teamId = await fetchTeamId(selectedTeam);

            // Include userId, username, and teamId in the data
            const data = {
                userId: userId,
                username: username,
                selectedTeam: selectedTeam,
                teamId: teamId,
            };

            // Placeholder fetch request for adding user to team
            const callback = async (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus === 200) {
                    // Check if team selection was successful
                    // Redirect or perform further actions
                    console.log("Team selection successful!");
                    window.location.href = "profile.html";

                    // Add user data to the table
                    addUserToTable(selectedTeam, { userId, username });
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // Placeholder fetch request
            fetchMethod(currentUrl + "/api/users/user_team", callback, "POST", data);
        } else {
            // No team selected or missing userId/username, handle error
            warningCard.classList.remove("d-none");
            warningText.innerText = "Please select a team and ensure you are logged in.";
        }
    });

    // Function to fetch teamId based on team name
    async function fetchTeamId(teamName) {
        // Placeholder logic to fetch teamId based on team name
        // You may need to adjust this based on your actual API
        const response = await fetch(currentUrl + "/api/team", {
            method: "GET",
        });

        const responseData = await response.json();

        const team = responseData.find((team) => team.name === teamName);

        return team ? team.id : null;
    }

    // Function to add user data to the table
    function addUserToTable(team, userData) {
        const row = document.createElement("tr");
        const teamCell = document.createElement("td");
        const userCell = document.createElement("td");

        teamCell.textContent = team === "1" ? "Team Phoenix" : "Team Legends";
        userCell.textContent = `${userData.username} (ID: ${userData.userId})`;

        row.appendChild(teamCell);
        row.appendChild(userCell);

        teamUserTableBody.appendChild(row);
    }
});


    
