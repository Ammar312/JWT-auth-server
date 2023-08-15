const form = document.querySelector("#form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await axios.post(
      "api/v1/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      displayAlert(response.data.message, "green");
      setTimeout(() => {
        window.location.assign("/home.html");
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    displayAlert(error.message, "red");
  }
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
