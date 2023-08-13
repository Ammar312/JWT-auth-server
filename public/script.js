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
        alert("Signup Successfully");
        window.location.replace("index.html");
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    alert("Password must be same");
  }
});
