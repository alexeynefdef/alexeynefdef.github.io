//login
function login() {
  const admin = "alex.nefdef@gmail.com";
  const adminPass = "admin";
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  if (email === admin && pass === adminPass) {
    document.cookie = "loggedin=true";
    window.open("./index.html", "_self");
  }
}
