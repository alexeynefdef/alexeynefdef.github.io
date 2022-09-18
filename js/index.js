function loadPlaylist() {
    document.getElementById('loader_wrapper').classList.add('loading');
    const opt = {
        method: "GET",
        headers: new Headers({ 'Access-Control-Allow-Origin': 'http://164.90.185.125:8080'})
    }
    fetch("http://164.90.185.125:8080/flowtherock/playlist", opt)
        .then(response => response.json())
        .then(json => parseResponse(json));
}

function reloadPlaylist() {
    const opt = {
        method: "GET",
        headers: new Headers({ 'Access-Control-Allow-Origin': 'http://164.90.185.125:8080'})
    }
    document.getElementById('loader_wrapper').classList.add('loading');
    fetch("http://164.90.185.125:8080/flowtherock/playlist/reload", opt)
        .then(response => response.json())
        .then(json => parseResponse(json));
}

function sortPlaylist(trackId) {
    showNowPlaying(trackId);
    const opt = {
        method: "GET",
        headers: new Headers({ 'Access-Control-Allow-Origin': 'http://164.90.185.125:8080'})
    }
    document.getElementById('loader_wrapper').classList.add('loading');
    document.getElementById('tracklist').innerHTML = '';
    fetch("http://164.90.185.125:8080/flowtherock/playlist/sort?trackId=" + trackId, opt)
        .then(response =>  {
            return response.json();
        })
        .then(json => parseResponse(json));
}

function parseResponse(responseData) {
    responseData.forEach(entry => {
        appendListItemToTrackList(entry);
    });

    document.getElementById('loader_wrapper').classList.remove('loading')
}

async function showNowPlaying(trackId) {
    const track = document.getElementById(trackId);
console.log(track);
    document.getElementById('now_playing').innerHTML = ''; 
    document.getElementById('now_playing').appendChild(track); 
}

function appendListItemToTrackList(item) {
    let tracklist = document.getElementById('tracklist');
    let matched = item.matched ? "matched" : "";
    let trackId = item.id;
    const node =
        '<dd ' +
        'class="tracklist_item ' + matched + '"' +
        ' track_id="' + trackId + '"' + 
        ' id="' + trackId + '"' +
        ' onclick="sortPlaylist(\'' + trackId + '\')"' +
        '">' +
            "<div>" + item.title + "</div>" +
            "<div>" + item.artist + "</div>" + 
            "<div>" + item.key + "</div>" +
            "<div>" + item.bpm + "</div>" + 
        '</dd>';
    tracklist.innerHTML += node;
}


