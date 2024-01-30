// taskProgress.js
function loadTaskProgress() {
    const progress_id = document.getElementById('progress_id').value;
  
    axios.get(`/taskprogress/${progress_id}`)
      .then(response => {
        const progressDetails = document.getElementById('progressDetails');
        progressDetails.innerHTML = `
          <h2>Task Progress Details</h2>
          <p>Completion Date: ${response.data.formatted_completion_date}</p>
          <p>Notes: ${response.data.notes}</p>
          <!-- Add more details as needed -->
        `;
      })
      .catch(error => {
        console.error(error.response.data);
      });
  }
  