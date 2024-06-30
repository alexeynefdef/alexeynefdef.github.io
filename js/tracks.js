function onLoad() {
    let id = getUrlParam("playlistId");
    loadPlaylist(id);
  }
  
  function getUrlParam(param) {
    let query = window.location.search;
    const urlParams = new URLSearchParams(query);
    return urlParams.get(param);
  }
  
  function backToPlaylists() {
    window.open("./index.html", "_self");
  }
  
  function loadPlaylist(playlistId) {
    document.getElementById("tracklist").innerHTML =
      "<dt id='tracklist-head' class='tracklist_item tracklist_item-head'>" +
      "<div class='tracklist_item-head-data'>Title</div>" +
      "<div class='tracklist_item-head-data'>Artist</div>" +
      "<div class='tracklist_item-head-data'>BPM</div>" +
      "<div class='tracklist_item-head-data'>Key</div>" +
      "</dt>";
    document.getElementById("loader_wrapper").classList.add("loading");
    document.getElementById("footer").classList.remove("loaded");
    const opt = {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "http://localhost:8080",
      }),
    };
    document.getElementById("loader_wrapper").classList.add("loading");
    fetch("http://localhost:8080/flowtherock/api/playlist/load?playlistId=" + playlistId, opt)
      .then((response) => response.json())
      .then((json) => parseResponse(json));
  }
  
  function sortPlaylist(trackId) {
    showNowPlaying(trackId);
    pausePreview();
    const opt = {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "http://localhost:8080",
      }),
    };
    document.getElementById("loader_wrapper").classList.add("loading");
    document.getElementById("footer").classList.remove("loaded");
    document.getElementById("tracklist").innerHTML =
      "<dt id='tracklist-head' class='tracklist_item tracklist_item-head'>" +
      "<div class='tracklist_item-head-data'>Title</div>" +
      "<div class='tracklist_item-head-data'>Artist</div>" +
      "<div class='tracklist_item-head-data'>BPM</div>" +
      "<div class='tracklist_item-head-data'>Key</div>" +
      "</dt>";
    fetch(
      "http://localhost:8080/flowtherock/api/playlist/sort?trackId=" + trackId, opt)
    .then((response) => response.json())
    .then((json) => parseResponse(json));
  }
  
  function parseResponse(responseData) {
    responseData.forEach((entry) => {
      appendListItemToTrackList(entry);
    });
  
    document.getElementById("loader_wrapper").classList.remove("loading");
    document.getElementById("footer").classList.add("loaded");
  }
  
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  
  async function showNowPlaying(trackId) {
    const track = document.getElementById(trackId);
    document.getElementById("now_playing").innerHTML = "";
    document.getElementById("now_playing").appendChild(track);
    const album = track.getAttribute("album");
    const preview = track.getAttribute("preview");
    const duration = millisToMinutesAndSeconds(track.getAttribute("duration"));
    const camelot = track.getAttribute("camelot");
    const node =
      "<dd " +
      'class="tracklist_item"' +
      ' track_id="' +
      trackId +
      '"' +
      ' id="' +
      trackId +
      '">' +
      "<div>" +
      track.childNodes[0].textContent +
      "</div>" +
      "<div>" +
      track.childNodes[1].textContent +
      "</div>" +
      "</dd>";
    let addBox = "";
    addBox += '<dt id="additional-data-head" class="tracklist_item">'
        addBox += '<div>';
        addBox += "Preview";
        addBox += '</div>';
        addBox += '<div>';
        addBox += "Album";
        addBox += '</div>';
        addBox += '<div>';
        addBox += "Duration";
        addBox += '</div>';
        addBox += '<div>';
        addBox += "Camelot";
        addBox += '</div>';
      addBox += '</dt>';
      addBox += '<dd id="additional-data" class="tracklist_item">';
  
      if (preview != "null" && preview != "") {
      addBox += '<div id="preview-play">';
      addBox += '<form action="javascript:;" onsubmit="playPreview(';
      addBox += "'";
      addBox += preview;
      addBox += "'";
      addBox += ')">';
      addBox += '<button class="player" type="submit"><i class="fa-solid fa-play"></i></button>'
      addBox += '</form>';
      addBox += '</div>';
      addBox += '<div id="preview-pause" class="hide-play">';
      addBox += '<form class="player" action="javascript:;" onsubmit="pausePreview()">';
      addBox += '<button class="player" type="submit"><i class="fa-solid fa-pause"></i></button>'
      addBox += '</form>';
      addBox += '</div>';
      } else {
        addBox += '<div>';
        addBox += "NO PREVIEW";
        addBox += '</div>';
      }
      addBox += '<div>';
      addBox += album;
      addBox += '</div>';
      addBox += '<div>';
      addBox += duration;
      addBox += '</div>';
      addBox += '<div>';
      addBox += camelot;
      addBox += '</div>';
    addBox += '</dd>';
    document.getElementById("played").innerHTML += node;
    document.getElementById("now_playing_add").innerHTML = addBox;
  }
  
  let currentAudio = null;
  
  function playPreview(url) {
    if(currentAudio == null) {
      currentAudio = new Audio(url);
      currentAudio.play();
      document.getElementById("preview-play").classList.add("hide-play");
      document.getElementById("preview-pause").classList.remove("hide-play");
    }
  }
  
  function pausePreview() {
    if(currentAudio != null) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      document.getElementById("preview-pause").classList.add("hide-play");
      document.getElementById("preview-play").classList.remove("hide-play");
      currentAudio = null;
    }
  }
  
  function appendListItemToTrackList(item) {
    let tracklist = document.getElementById("tracklist");
    let matched = item.matched ? "matched" : "";
    let trackId = item.id;
    const node =
      "<dd " +
      'class="tracklist_item ' +
      matched +
      '"' +
      ' track_id="' +
      trackId +
      '"' +
      ' id="' +
      trackId +
      '"' +
      ' onclick="sortPlaylist(' + "'" +
      trackId +
      "')" + '" ' +
      'album="' + item.album + '"' +
      'preview="' + item.previewUrl + '"' +
      'duration="' + item.duration + '"' +
      'camelot="' + item.camelot + '"' +
      '>' +
      "<div class='track_title'>" +
      item.title +
      "</div>" +
      "<div class='track_artist'>" +
      item.artist +
      "</div>" +
      "<div  class='track_key'>" +
      item.key +
      "</div>" +
      "<div  class='track_bpm'>" +
      item.bpm +
      "</div>" +
      "</dd>";
    tracklist.innerHTML += node;
  }
  
  function clearPlaylist() {
    document.getElementById("played").innerHTML = "";
  }
  
  function savePlaylist() {
    const playlistToSave = document.getElementById("played");
    let tracksIds = [];
    for (const track of playlistToSave.childNodes) {
      console.log(track);
    }
  }
  
  //side card
  document.getElementById("side_button").addEventListener("click", () => {
    document.getElementById("side-card").classList.toggle("hide");
    let sideButton = document.getElementById("side_button");
    if (sideButton.textContent == "<") {
      sideButton.textContent = ">";
    } else {
      sideButton.textContent = "<";
    }
  });
  
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