const searchArea = document.getElementById('searchArea');
const searchBtn = document.getElementById('searchBtn'); 
const result = document.getElementById('result');
const lyricsLine = document.getElementById('lyricsLine');



const apiUrl = `https://api.lyrics.ovh`;
// search button event handler added
searchBtn.addEventListener('click', ()=>{
    const searchText = searchArea.value;
    if(searchText ==''){
        alert('Please enter song lyrics or artist name');
    }
    else{
        getSongTittle(searchText)
        searchArea.value =''
    }
})

// calling first api 
getSongTittle=text=>{
    fetch(`${apiUrl}/suggest/${text}`)
    .then(response => response.json())
    .then(data => showData(data))
}

// getting tittle 
showData=data=>{
    let output = '';
    const secondData = data.data;

    for(let i = 0; i < 10;i++){
        let song = secondData[i];
        artistName(song);
    }
    
    // displaying song tittle and author name 
   function artistName(song){
        output+= ` <p class="author lead d-flex"><strong>${song.title} </strong>&nbsp; Album by &nbsp;<span> ${song.artist.name}</span> <button class="btn btn-success ml-auto" data-artist ="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></p>`;
    }
    result.innerHTML = ` ${output}`;
}



// getting artist name and tittle 
result.addEventListener('click', function(e){
    const lyricsBtn = e.target;
    if(lyricsBtn.tagName ==='BUTTON'){
        const artist = lyricsBtn.getAttribute('data-artist');
        const songTitle = lyricsBtn.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
})
// second api call
  getLyrics=(artist, songTitle)=>{
    fetch(`${apiUrl}/v1/${artist}/${songTitle}`)
    .then(response =>  response.json())
    .then(data =>  {
        const songLineSeparation = data.lyrics;
        lyricsLine.innerHTML =`<h2 class="text-success mb-4"><strong> ${artist} </strong> - ${songTitle}</h2>
        <pre class="lyric text-white">${songLineSeparation}</pre>`;

    })
}

