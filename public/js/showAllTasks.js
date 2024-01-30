//update task work part
// document.addEventListener("DOMContentLoaded", function() {
//     const taskList = document.getElementById("taskList");

//     const callback = (responseStatus, responseData) => {
//         console.log("responseStatus:", responseStatus);
//         console.log("responseData:", responseData);

//         const displayRow = document.createElement("div");
//         displayRow.className = "row justify-content-center";

//         responseData.forEach((task) => {
//             const displayItem = document.createElement("div");
//             displayItem.className = "col-md-4 p-3"; // Adjust the column size as needed
//             displayItem.innerHTML = `
//             <div class="card card-custom">
//                 <div class="card-body text-dark">
//                     <h5 class="card-title">${task.title}</h5>
//                     <p class="card-text">
//                         Task Id: ${task.task_id} <br>
//                         Title: ${task.title} <br>
//                         Description: ${task.description}<br>
//                         Points: ${task.points}
//                     </p>
//                     <button class="btn btn-success" onclick="updateTask(${task.task_id})">Update Task</button>
//                     <button class="btn btn-primary" onclick="completeTask(${task.task_id})">Complete Task</button>
//                 </div>
//             </div>
//         `;

//         // Add event listener to the "Update Task" button
//         const updateButton = displayItem.querySelector(".btn-success");
//         updateButton.addEventListener("click", () => {
//             updateTask(task.task_id);
//         });
        
//             displayRow.appendChild(displayItem);
//         });

//         taskList.appendChild(displayRow);
//     };

//     // Function to navigate to the update task page
//     function updateTask(taskId) {
//         window.location.href = `updateTask.html?task_id=${taskId}`;
//     }

//     // Attach the updateTask function to the button's onclick event
//     window.updateTask = updateTask;


//     // This is your existing code fetching and displaying tasks
//     fetchMethod(currentUrl + "/api/tasks", callback);
// });
//////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("taskList");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const displayRow = document.createElement("div");
        displayRow.className = "row justify-content-center";

        responseData.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-md-4 p-3"; // Adjust the column size as needed
            displayItem.innerHTML = `
            <div class="card card-custom">
                <div class="card-body text-dark">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">
                        Task Id: ${task.task_id} <br>
                        Title: ${task.title} <br>
                        Description: ${task.description}<br>
                        Points: ${task.points}
                    </p>
                    <button class="btn btn-success" onclick="updateTask(${task.task_id})">Update Task</button>
                    <button class="btn btn-primary" onclick="completeTask(${task.task_id})">Complete whe Task</button>
                </div>
            </div>
        `;

        // Add event listener to the "Update Task" button
        const updateButton = displayItem.querySelector(".btn-success");
        updateButton.addEventListener("click", () => {
            updateTask(task.task_id);
        });

        // Add event listener to the "Complete Task" button
        const completeButton = displayItem.querySelector(".btn-primary");
        completeButton.addEventListener("click", () => {
            completeTask(task.task_id);
        });

        displayRow.appendChild(displayItem);
        });

        taskList.appendChild(displayRow);
    };

    // Function to navigate to the update task page
    function updateTask(taskId) {
        window.location.href = `updateTask.html?task_id=${taskId}`;
    }

    // Function to complete the task
    function completeTask(taskId) {
        const userId = localStorage.getItem("userId");
        const completionDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

        const data = {
            user_id: userId,
            task_id: taskId,
            completion_date: completionDate,
            notes: "Task completed" // You can customize the notes if needed
        };

        const completionCallback = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Task completed:", responseData);
                // You can add additional logic or UI changes after completing the task if needed
                // Redirect or perform any action as needed
            } else {
                console.error("Error completing task:", responseStatus);
                // Handle errors, show error messages, etc.
            }
        };

        // Assuming you have a function like fetchMethod to make the API call
        fetchMethod(currentUrl + "/api/task_progress", completionCallback, "POST", data);
    }

    // Attach the updateTask and completeTask functions to the button's onclick events
    window.updateTask = updateTask;
    window.completeTask = completeTask;

    // This is your existing code fetching and displaying tasks
    fetchMethod(currentUrl + "/api/tasks", callback);
});

