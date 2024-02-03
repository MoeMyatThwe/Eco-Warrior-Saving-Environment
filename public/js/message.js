
//Moe Myat Thwe 2340362 DIT FT 1B 05

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      console.log(responseData);
      const messages = responseData[0];
      const currentUserId = responseData[1];  
      const messageList = document.getElementById("messageList");
      messages.forEach((message) => {

        const displayMessages = document.createElement("div");
        displayMessages.className =
        "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4 leaderboard-item";
        displayMessages.innerHTML = `
            <div class="my-2 ${currentUserId === message.user_id ? 'userMessage' : 'message-container1'}">
                <div class="card-body clickable"">
                    <div class="card-text">
                        <p class="mb-0 text-white"><strong>User Name</strong></p>
                        <p class="mb-0 text-white">${message.user_id == currentUserId ? " YOU" : `${message.username}`}</p>
                    </div>
                    <div class="card-text d-flex">
                    <p class="mb-0 text-white"><strong>Created on : </strong></p>
                    <p class="mb-0 text-white">${message.created_at}</p>
                    </div>
                    <div class="card-text">
                        <p class="mb-0 text-white"><strong>Message</strong></p>
                        <p class="mb-0 text-white">${message.message}</p>
                    </div>
                    
                    <div class=" d-flex">
                      ${message.user_id == currentUserId
          ? `<button id="editUserMessage" style="cursor: pointer" data-message-id="${message.id}" class="me-3"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>   Edit</button>`
          : ''
        }
                      ${message.user_id == currentUserId
          ? `<button id="deleteUserMessage" style="cursor: pointer" data-message-id="${message.id}"><i class="fa-solid fa-trash" style="color: #ffffff;"></i>   Delete</button>`
          : ''
        }
                    </div>
                   
                </div>
            </div>
        `;
      messageList.appendChild(displayMessages);

      const deleteUserMessage = displayMessages.querySelector("#deleteUserMessage");

      const editUserMessage =  displayMessages.querySelector("#editUserMessage");
      console.log(editUserMessage)
      if (editUserMessage) {
        editUserMessage.addEventListener("click", function () {
          const messageId = this.getAttribute("data-message-id");
          console.log(editUserMessage)
          const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
          progressModal.show();
          const updateButton = document.getElementById("updateButton");
          updateButton.addEventListener("click", function () {
            const updateMessage = document.getElementById("updateMessage");
            const message = updateMessage.value;
            if (message != null) {
              const messageData = {
                message: message,
              };
              const callbackForEditMessage = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus === 204) {
                  window.location.reload();
                }
              };
              fetchMethod(currentUrl + `/api/messages/${messageId}`, callbackForEditMessage, "PUT", messageData);
            }
          });
        });
      }

      if (deleteUserMessage) {
        deleteUserMessage.addEventListener("click", function () {
          const messageId = this.getAttribute("data-message-id");
          const callbackForDeleteMessage = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus === 204) {
              window.location.reload();
            }
          };
          fetchMethod(currentUrl + `/api/messages/${messageId}`, callbackForDeleteMessage, "DELETE");
        });
      }
    });

    const submit = document.getElementById("submit");
    const input_value = document.getElementById("sendMessage");
    submit.addEventListener("click", function (event) {
      event.preventDefault();
      const message = input_value.value;
      const messageData = {
        message: message,
      };
      const callbackForMessage = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus === 201) {
          window.location.reload();
        }
      };
      fetchMethod(currentUrl + "/api/messages", callbackForMessage, "POST", messageData, token);
    });
  };

  // Replace the URL below with your actual API endpoint
  fetchMethod(currentUrl + "/api/messages", callback, "GET", null, token);
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 10);
});