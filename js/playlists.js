function isLoggedIn() {
  if (getCookie("loggedin") != "true") {
    window.open("./login.html", "_self");
  } else {
    loadAllPlaylitst();
    loadAllPlaylitst();
    loadAllPlaylitst();
    loadAllPlaylitst();
    loadAllPlaylitst();
  }
}

function loadAllPlaylitst() {
  let id = "playlistId12345676";
  let img = "./img/63596316.jfif";
  let title = "Playlist title";
  let info = "Playlist info";
  let item =
    "<dd " +
    'id="playlistId12345676"' +
    ' playlistid="playlistId12345676"' +
    ' class="playlist-list"' +
    " onclick=\"openPlaylist('" +
    id +
    "')\"" +
    ">" +
    '<div class="playlist-item-wrapper">' +
    '<img src="' +
    img +
    '"' +
    ' alt="playlist cover" class="playlist-item" />' +
    '<div class="playlist-item">' +
    "<h3>" +
    title +
    "</h3>" +
    "<p>" +
    info +
    "</p>" +
    "</div>" +
    "</div>" +
    "</dd>";
  document.getElementById("playlists").innerHTML += item;
}

function openPlaylist(playlistId) {
  console.log(playlistId);
  window.open("./index.html", "_self");
}

//Get cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//toggle
const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.getElementById("main-heading").classList.toggle("light");
  let buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.classList.toggle("dark");
  }

  let isDark = false;
  let bodyClassList = document.body.classList;
  bodyClassList.forEach((className) => {
    if (className === "dark") {
      isDark = true;
    }
  });

  let items = document.getElementsByTagName("dd");
  for (const item of items) {
    item.classList.toggle("dark");
  }
});
