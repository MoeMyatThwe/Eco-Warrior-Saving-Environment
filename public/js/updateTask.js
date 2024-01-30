
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("task_id");

    fetchMethod(currentUrl + `/api/tasks/${taskId}`, (responseStatus, responseData) => {
        if (responseStatus === 200) {
            createUpdateForm(responseData);
        } else {
            console.error("Error fetching task details:", responseStatus);
        }
    });
});

function createUpdateForm(taskDetails) {
    const updateTaskContainer = document.getElementById("updateTaskContainer");

    // Create form elements dynamically
    const form = document.createElement("form");
    form.id = "updateTaskForm";
    form.innerHTML = `
        <label for="title">Task Title:</label>
        <input type="text" id="title" name="title" value="${taskDetails.title}" required><br>

        <label for="description">Task Description:</label>
        <textarea id="description" name="description" required>${taskDetails.description}</textarea><br>

        <label for="points">Task Points:</label>
        <input type="number" id="points" name="points" value="${taskDetails.points}" required><br>

     
    `;

    // Append the form to the container
    updateTaskContainer.innerHTML = ''; // Clear previous content
    updateTaskContainer.appendChild(form);

    // Add event listener to the "Save Changes" button
    const saveChangesBtn = document.getElementById("saveChangesBtn");
    saveChangesBtn.addEventListener("click", saveUpdatedTask);
}

function saveUpdatedTask() {
    // Retrieve updated task details from the form
    const updatedTitle = document.getElementById("title").value;
    const updatedDescription = document.getElementById("description").value;
    const updatedPoints = document.getElementById("points").value;

    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("task_id");

    // Create an object with the updated task details
    const updatedTaskData = {
        title: updatedTitle,
        description: updatedDescription,
        points: updatedPoints,
    };

    // Send updated task details to the server
    fetchMethod(currentUrl + `/api/tasks/${taskId}`, (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("Task updated:", responseData);
            // You can add additional logic or UI changes after updating the task if needed
            // Redirect to the task list page or any other page as needed
            window.location.href = "task.html";
        } else {
            console.error("Error updating task:", responseStatus);
            // Handle errors, show error messages, etc.
        }
    }, "PUT", updatedTaskData);
}
