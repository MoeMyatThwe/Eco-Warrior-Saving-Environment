//Moe Myat Thwe 2340362 DIT FT 1B 05
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
                        <div class="btn-group" role="group">
                            <button class="btn btn-danger" onclick="deleteTask(${task.task_id})">Delete Task</button>
                            <button class="btn btn-success" onclick="updateTask(${task.task_id})">Update Task</button>
                            <a href="#" class="btn btn-primary" data-task-id=${task.task_id}>Complete Task</a>
                            
                        </div>
                    </div>
                </div>
            `;

            // Add event listeners to the buttons
            const updateButton = displayItem.querySelector(".btn-success");
            const completeButton = displayItem.querySelector(".btn-primary");
            const deleteButton = displayItem.querySelector(".btn-danger");

            updateButton.addEventListener("click", () => {
                updateTask(task.task_id);
            });

            completeButton.addEventListener("click", (event) => {
                const task_id = event.target.getAttribute('data-task-id')
                completeTask(task_id,task.points);
            });

            deleteButton.addEventListener("click", () => {
                deleteTask(task.task_id);
            });

            displayRow.appendChild(displayItem);
        });

        taskList.appendChild(displayRow);
    };

    // Function to navigate to the update task page
    function updateTask(taskId) {
        window.location.href = `updateTask.html?task_id=${taskId}`;
    }

    // Function to delete a task
function deleteTask(taskId) {
    const confirmation = confirm("Are you sure you want to delete this task?");

    if (confirmation) {
        const deleteCallback = (responseStatus, responseData) => {
            if (responseStatus === 204) {
                console.log("Task deleted successfully:", responseData);
                // Optionally, you can reload the task list after deleting a task
                location.reload();
            // }else{
            //     fetchTasks();
            } else {
                console.error("Error deleting task:", responseStatus, responseData);
                // Handle errors, show error messages, etc.
            }
        };

        // Assuming you have a function like fetchMethod to make the API call
        fetchMethod(currentUrl + `/api/tasks/${taskId}`, deleteCallback, "DELETE",null,localStorage.getItem('token'));

    }
}


    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    // Function to complete the task
    function completeTask(taskId,points) {
        const userId = parseJwt(localStorage.getItem("token")).userId;
        const completionDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
        const notes = prompt("Enter notes for Task completion:");
        console.log(notes)
        // if (notes == " ") {
        //     return;
        // }
        const data = {
            user_id: userId,
            task_id: taskId,
            points : points,
            completion_date: completionDate,
            //notes: "Task completed" // You can customize the notes if needed
            notes: notes
        };

        const completionCallback = (responseStatus, responseData) => {
            if (responseStatus === 201) {
                console.log("Task completed:", responseData);
                window.location.href = "taskprogress.html?task_id="+ data.task_id
                // You can add additional logic or UI changes after completing the task if needed
                // Redirect or perform any action as needed
            } else {
                console.error("Error completing task:", responseStatus);
                // Handle errors, show error messages, etc.
            }
        };

        // Assuming you have a function like fetchMethod to make the API call
        fetchMethod(currentUrl + "/api/task_progress", completionCallback, "POST", data,localStorage.getItem('token'));

    }

    // Attach the updateTask and completeTask functions to the button's onclick events
    window.updateTask = updateTask;
    window.completeTask = completeTask;
    window.deleteTask = deleteTask;
    

    // Function to fetch and display tasks
   
        // Implement your logic to fetch tasks and update the UI
        fetchMethod(currentUrl + `/api/tasks?user_id=${localStorage.getItem('userId')}`, callback, "GET",null,localStorage.getItem('token'));


    // Initial fetch and display of tasks
    
});


