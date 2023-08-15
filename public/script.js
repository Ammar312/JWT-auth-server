const form = document.querySelector("#signupForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (password === confirmPassword) {
    axios
      .post("/api/v1/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        displayAlert("Signup Successfully", "green");
        setTimeout(() => {
          window.location.replace("index.html");
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
        displayAlert(error.response.data.message, "red");
      });
  } else {
    displayAlert("Password must be same", "black");
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
