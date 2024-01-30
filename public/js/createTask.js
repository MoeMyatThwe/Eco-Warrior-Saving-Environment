document.addEventListener("DOMContentLoaded", function () {
    const createTaskForm = document.getElementById("createTaskForm");

    createTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(createTaskForm);
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            points: formData.get("points"),
        };

        const createTaskCallback = (responseStatus, responseData) => {
            if (responseStatus === 201) {
                console.log("Task created successfully:", responseData);
                // Optionally, you can reload the task list after creating a new task
                fetchTasks();
            } else {
                console.error("Error creating task:", responseStatus, responseData);
                // Handle errors, show error messages, etc.
            }
        };

        // Assuming you have a function like fetchMethod to make the API call
        fetchMethod(currentUrl + "/api/tasks", createTaskCallback, "POST", data);
    });

    // Function to fetch and display tasks
    function fetchTasks() {
        const taskList = document.getElementById("taskList");
    
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
    
            // Clear existing task list
            taskList.innerHTML = "";
    
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
                        <button class="btn btn-primary" onclick="completeTask(${task.task_id})">Complete Task</button>
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
    
        // Assuming you have a function like fetchMethod to make the API call
        fetchMethod(currentUrl + "/api/tasks", callback);
    }
    

    // Initial fetch and display of tasks
    fetchTasks();
});
