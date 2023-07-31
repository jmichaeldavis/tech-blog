const newBlogPostBtn = document.getElementById("new-blogpost-btn");
const cancelBlogPostBtn = document.getElementById("cancel-blogpost-btn");
const newBlogPostContainer = document.getElementById("new-blogpost-container")
// const deleteBtn = document.getElementById("delete-btn");
// const postId = deleteBtn.getAttribute('data-id');
// const addDeleteEvent = function (button) {
//     for (var i = 0; i < button.length; i++) {
//         button[i].addEventListener('click', deleteReminder,
//         )
//     }
// };

function getSelectedCheckboxes() {
  event.preventDefault();
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const selectedCheckboxes = [];
  closeForm();
  checkboxes.forEach(function (checkbox) {
    selectedCheckboxes.push(checkbox.value);
  });
  const reminderTitle = document.getElementById("post-name").value.trim();
  const reminderBody = document.getElementById("post-desc").value.trim();
  const monthString = `${selectedCheckboxes}`;

  const reminderData = {
    task_title: reminderTitle,
    task_description: reminderBody,
    months: monthString,
  };

  fetch("/api/reminders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reminderData),
  })
    .then((response) => {
      document.location.replace("/");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(reminderData);
  showNewReminderBtn();
  window.location.reload();
  return;
}


function hideNewBlogPostBtn() {
  newBlogPostBtn.style.display = "none";
}

function showNewBlogPostBtn() {
  newBlogPostBtn.style.display = "block";
}

function openForm() {
  newBlogPostContainer.style.display = "block";
  hideNewBlogPostBtn();
}

function closeForm() {
  newBlogPostContainer.style.display = "none";
  showNewBlogPostBtn();
}

function returnHomePage() {
  console.log("this is working");
  document.location.replace("/");
}

const deleteBlogPost = function () {
  // fetch(`/api/reminders/${reminderId}`, {
    //     method: "DELETE",
    // })
    //     .then((response) => {
      //         console.log(response);
      //         // response.json())
      
      //     })
      //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        
        // returnHomePage();
        // return;
        console.log("test");
      };

      const delButtonHandler = async (event) => {
        if (event.target.hasAttribute("data-id")) {
          const id = event.target.getAttribute("data-id");
      
          const response = await fetch(`/api/reminders/${id}`, {
            method: "DELETE",
          });
      
          if (response.ok) {
            document.location.replace("/");
          } else {
            alert("Failed to delete reminder");
          }
        }
      };
      
      createReminder.addEventListener("click", getSelectedCheckboxes);
      
      newBlogPostBtn.addEventListener("click", openForm);
      
      cancelBlogPostBtn.addEventListener("click", closeForm);
      
      // deleteBtn.addEventListener("click", deleteReminder);
      // document.querySelector(".delete-btn").addEventListener("click", delButtonHandler);
      