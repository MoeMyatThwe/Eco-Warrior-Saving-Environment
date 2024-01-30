// taskCompletion.js
function completeTask() {
    const user_id = document.getElementById('user_id').value;
    const task_id = document.getElementById('task_id').value;
  
    axios.post(`/taskprogress/complete/${task_id}`, { user_id: user_id })
      .then(response => {
        console.log(response.data.message);
        // Handle success (e.g., show a success message)
      })
      .catch(error => {
        console.error(error.response.data);
        // Handle error (e.g., show an error message)
      });
  }
  