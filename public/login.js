const form = document.querySelector("#form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await axios.post("api/v1/login", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      alert(response.data.message);
      window.location.assign("/home.html");
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
});
