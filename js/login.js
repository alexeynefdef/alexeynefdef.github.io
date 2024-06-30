//login
function loginWithSpotify() {
  document.cookie = "loggedin=true";
  window.open("http://localhost:8080/flowtherock/api/authorize", "_self");
}
