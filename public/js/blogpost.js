const newBlogPostBtn = document.getElementById("new-blogpost-btn");
const submitBlogPostBtn = document.getElementById("submit-blogpost-btn");
const cancelBlogPostBtn = document.getElementById("cancel-blogpost-btn");
const newBlogPostContainer = document.getElementById("new-blogpost-container");
const returnHomeBtn = document.getElementById("return-home-btn");

function setBlogPostData() {
  const blogPostTitle = document.getElementById("title-input").value;
  const blogPostContents = document.getElementById("contents-input").value;

  const blogpostData = {
    title: blogPostTitle,
    contents: blogPostContents,
  };

  fetch("/api/blog-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogpostData),
  })
    .then((response) => {
      document.location.replace("/");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(blogpostData);
  showNewReminderBtn();
  window.location.reload();
  return;
}

const deleteBlogPost = function () {
  // fetch(`/api/blog-post/${postID}`, {
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

    const response = await fetch(`/api/blog-post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete blog post");
    }
  }
};

const returnHomePage = function () {
  document.location.replace("/");
};

returnHomeBtn.addEventListener("click", returnHomePage);

document.querySelector("#submitBlogpostBtn").addEventListener("click", setBlogPostData);

