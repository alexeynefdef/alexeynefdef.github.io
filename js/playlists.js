function loadUserData() {
  if (getCookie("loggedin") == "true") {
    const opt = {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "http://localhost:8080",
      }),
    };
    fetch("http://localhost:8080/flowtherock/api/user", opt)
      .then((response) => response.json())
      .then((json) => parseUserData(json))
      .then(this.loadAllPlaylists());
  } else {
    window.open("./login.html", "_self");
  }
}

function parseUserData(user) {
  //let id = user.id;
  let email = user.email;
  let name = user.name;
  let img = user.img;

  let data  = '';
  data += '<div class="user-data" id="user-img"> ';
  data += '<img src="' + img + '" >';
  data += ' </div>';
  data += '<div class="user-data" id="user-name"> ';
  data += '<h1>';
  data += name;
  data += '</h1>';
  data += ' </div>';
  data += '<div class="user-data" id="user-email"> ';
  data += '<h3>';
  data += email;
  data += '</h3>';
  data += ' </div>';
  document.getElementById("user-data-box").innerHTML += data;  
}

function loadAllPlaylists() {
  document.getElementById("loader_wrapper").classList.add("loading");
  const opt = {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://localhost:8080",
    }),
  };
  fetch("http://localhost:8080/flowtherock/api/playlists", opt)
    .then((response) => response.json())
    .then((json) => parsePlaylists(json));
}

function parsePlaylists(json) {
  json.forEach((entry) => {
    appendPlaylist(entry);
  });
  document.getElementById("loader_wrapper").classList.remove("loading");
}

function appendPlaylist(playlist) {
  let id = playlist.id;
  let img = playlist.imageUrl;
  let title = playlist.title;
  let info = "Total tracks: " + playlist.count;
  let item =
    "<dd " +
    'id="' + id + '"' +
    ' playlistid="' + id + '"' +
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
  window.open("./tracks.html?playlistId=" + playlistId, "_self");
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