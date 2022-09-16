function loadPlaylist() {
    document.getElementById('loader_wrapper').classList.add('loading');
    fetch("http://localhost:8080/flowtherock/playlist")
        .then(response => response.json())
        .then(json => parseResponse(json));
}

function sortPlaylist(trackId) {
    document.getElementById('loader_wrapper').classList.add('loading');
    document.getElementById('tracklist').innerHTML = '';
    fetch("http://localhost:8080/flowtherock/playlist/sort?trackId=" + trackId)
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

function appendListItemToTrackList(item) {
    let tracklist = document.getElementById('tracklist');
    let matched = item.matched ? "matched" : "";
    let trackId = item.id;
    const node =
        '<dd class="tracklist_item ' + matched + '"' +
        'track_id="' + trackId + '"' + 
        ' onclick="sortPlaylist(\'' + trackId + '\')"' +
        '">' +
            "<div>" + item.title + "</div>" +
            "<div>" + item.artist + "</div>" + 
            "<div>" + item.key + "</div>" +
            "<div>" + item.bpm + "</div>" + 
        '</dd>';
        console.log(node);

    tracklist.innerHTML += node;
}


