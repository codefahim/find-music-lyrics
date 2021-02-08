const searchText = () => {
    const customeInput = document.getElementById('customeInput').value;
    const link = `https://api.lyrics.ovh/suggest/${customeInput}`
    fetch(link)
        .then(response => response.json())
        .then(data => {
            displaySongs(data.data)
        })
        .catch(error => {
            if (error) {
                lyrics.innerText = "We Don't Find Any Song";
            };
        })


};

const displaySongs = (songs) => {
    const result = document.getElementById('displayLocation');
    let html = " ";
    songs.forEach(song => {

        html += `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                <source src="${song.preview}" type="audio/ogg">
                </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')" >Get Lyrics</button>
        </div>
    </div> 
        `;
        result.innerHTML = html;


    });
}
const lyrics = document.getElementById('songLyric');
const getLyrics = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLyrics(data);
    } catch (error) {
        const notFound = "Please Try Again Later";
        lyrics.innerText = notFound;
    }

}

const displayLyrics = (x) => {

    if (x.lyrics) {
        lyrics.innerText = x.lyrics
    } else {
        const notFound = "We don't find any Lyrics For this Song!";
        lyrics.innerText = notFound;
    }

}