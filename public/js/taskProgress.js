//Moe Myat Thwe 2340362 DIT FT 1B 05

document.addEventListener("DOMContentLoaded", function () {
    const user_id = localStorage.getItem('userId')
  const taskProgressList = document.getElementById("taskProgressList");
  url = new URL(document.URL);
      const task_id = url.searchParams.get('task_id')

     
 // const userId = localStorage.getItem('userId')
  const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 404) {
        taskProgressList.innerHTML = `${responseData.message}`;
          return;
      }

      responseData.forEach(responseData =>{
        
        taskProgressList.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                    Progress ID: ${responseData.progress_id} <br>
                    Task ID: ${responseData.task_id} <br>
                    User ID: ${responseData.user_id} <br>
                    Completion Date : ${responseData.completion_date} <br>
                    Notes : ${responseData.notes} <br>
                    
                    
                    
                </p>
               
            </div>
        </div>
        
    `;
    
      })
  };

  fetchMethod(currentUrl + `/api/task_progress/${user_id}/${task_id}`, callback, "GET", null, localStorage.getItem('token'));
      

});

//Points : ${responseData.total_points} 