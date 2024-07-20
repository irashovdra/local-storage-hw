document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".login-form");
  const usernameInput = document.querySelector(".username");
  const passwordInput = document.querySelector(".password");

  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");

  if (savedUsername && savedPassword) {
    usernameInput.value = savedUsername;
    passwordInput.value = savedPassword;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Дані збережено!");
  });
});
