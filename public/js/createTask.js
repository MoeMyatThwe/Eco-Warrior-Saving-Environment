//Moe Myat Thwe 2340362 DIT FT 1B 05
document.addEventListener("DOMContentLoaded", function () {
    const createTaskForm = document.getElementById("createTaskForm");

    createTaskForm.addEventListener("submit", function (event) {
        // event.preventDefault();

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
                fetchAndDisplayTasks();
            } else {
                console.error("Error creating task:", responseStatus, responseData);
                // Handle errors, show error messages, etc.
            }
        };

        // Assuming you have a function like fetchMethod to make the API call
        fetchMethod(currentUrl + "/api/tasks", createTaskCallback, "POST", data,localStorage.getItem('token'));
    });

    // Function to fetch and display tasks
    function fetchAndDisplayTasks() {
        const taskList = document.getElementById("taskList");

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            // Clear existing task list
            taskList.innerHTML = "";

            const displayRow = document.createElement("div");
            displayRow.className = "row justify-content-center";

            responseData.forEach((task) => {
                const displayItem = createTaskCard(task);
                displayRow.appendChild(displayItem);
            });

            taskList.appendChild(displayRow);
        };

        // Assuming you have a function like fetchMethod to make the API call
        fetchMethod(currentUrl + "/api/tasks", callback,"GET",null,localStorage.getItem('token'));
        
  }
  
    });
