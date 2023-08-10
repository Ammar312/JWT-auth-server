const postContainer = document.querySelector("#postContainer");
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const text = document.querySelector("#text").value;
  axios
    .post("api/v1/post", {
      // .post("https://wild-ruby-tortoise-hose.cyclic.app/api/v1/post", {
      title: title,
      text: text,
    })
    .then(function (response) {
      form.reset();
      displayAlert(response.data, "black");
    })
    .catch(function (error) {
      displayAlert(error.message, "red");
    });
  document.querySelector("#formContainer").style.display = "none";
  createPostBtn.style.display = "block";
});

window.addEventListener("load", () => {
  axios
    .get("api/v1/posts")
    // .get("https://wild-ruby-tortoise-hose.cyclic.app/api/v1/posts")
    .then(function (response) {
      // handle success
      const data = response.data;
      console.log(data);
      data.forEach((ele) => {
        const post = document.createElement("div");
        post.classList.add("post");
        const title = document.createElement("div");
        title.classList.add("title");
        title.innerText = ele.title;
        const text = document.createElement("div");
        text.classList.add("text");
        text.innerText = ele.text;
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btnDiv");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button");
        deleteButton.innerText = "Delete";
        const editButton = document.createElement("button");
        editButton.classList.add("button");
        editButton.innerText = "Edit";
        btnDiv.appendChild(deleteButton);
        btnDiv.appendChild(editButton);
        post.appendChild(title);
        post.appendChild(text);
        post.appendChild(btnDiv);
        postContainer.appendChild(post);
        deleteButton.addEventListener("click", () => deletePostFunc(ele._id));
        editButton.addEventListener("click", () =>
          editPostFunc(ele._id, ele.title, ele.text)
        );
        console.log(ele);
        console.log(ele._id);
      });
      //   console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      displayAlert(error.message, "red");
    });
});

const deletePostFunc = (id) => {
  axios
    .delete(`api/v1/post/${id}`)
    // .delete(`https://wild-ruby-tortoise-hose.cyclic.app/api/v1/post/${id}`)
    .then(function (response) {
      displayAlert(response.data, "red");
    })
    .catch(function (error) {
      displayAlert(error.message, "red");
    });
};

const editPostFunc = (id, title, text) => {
  const editFormDiv = document.querySelector("#editFormDiv");
  editFormDiv.style.display = "block";
  const editForm = document.querySelector("#editForm");
  const editFormTitle = document.querySelector("#editFormTitle");
  const editFormText = document.querySelector("#editFormText");
  editFormTitle.value = title;
  editFormText.value = text;
  const editFormFunc = (e) => {
    e.preventDefault();
    axios
      .put(`api/v1/post/${id}`, {
        //   .put(`https://wild-ruby-tortoise-hose.cyclic.app/api/v1/post/${id}`, {
        title: editFormTitle.value,
        text: editFormText.value,
      })
      .then(function (response) {
        displayAlert(response.data, "green");
      })
      .catch(function (error) {
        displayAlert(error.message, "red");
      });
    editForm.reset();
    editFormDiv.style.display = "none";
    editForm.removeEventListener("submit", editFormFunc);
  };

  editForm.addEventListener("submit", editFormFunc);
};

const cross = document.querySelector("#cross");
cross.addEventListener("click", () => {
  const editFormDiv = document.querySelector("#editFormDiv");
  editFormDiv.style.display = "none";
});

const createPostBtn = document.querySelector("#createPostBtn");
createPostBtn.addEventListener("click", () => {
  document.querySelector("#formContainer").style.display = "block";
  createPostBtn.style.display = "none";
});

const alertBox = document.querySelector("#alertBox");
const displayAlert = (txt, clss) => {
  alertBox.textContent = txt;
  alertBox.classList.add(clss);
  // remove alert
  setTimeout(() => {
    alertBox.textContent = "";
    alertBox.classList.remove(clss);
  }, 2000);
};
