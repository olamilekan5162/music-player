const mainMain = document.querySelector('.main-main')
const header = document.querySelector('.header')

// const MY_API = 'https://api.deezer.com/search?q=pop'
// const MY_API = 'https://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=a35ee8fa0422bab3ab5e3aec2c51120c&format=json';
const MY_API = 'https://api.jamendo.com/v3.0/tracks/?client_id=e7ce9afa&format=jsonpretty&limit=50&fuzzytags=groove+rock&speed=high+veryhigh';

async function fetchMusic(){
    try{

        const res = await fetch(MY_API)
        if(!res.ok){
            throw new Error('fail to load dashboard, please refresh the page')
        }

        const data = await res.json()
        console.log(data.results)
        displayMusic(data.results)

    }
    catch(e){
        console.error(e)
        
    }
}

fetchMusic();

function displayMusic(data){

    data.forEach((music) => {
        // learnt this and i felt it is cool than adding child element one by one

        const tracksContainer = `
        
        <div class="track-box">

                        <div class="track-image">
                            <img src="${music.album_image}" id="cover-art">

                        </div>

                        <p id="track-title">${music.name}</p>

                        <p id="track-artist">${music.artist_name}</p>

                    </div>
        `;

        mainMain.insertAdjacentHTML('beforeend', tracksContainer)
    });

    const trackBox = document.querySelectorAll('.track-box')

    trackBox.forEach((track, index) => {

        track.addEventListener('click', () => {

            music = data[index]

            const searchContainer = `
             <div class="search-box">

                        <div class="search-image">
                            <img src="${music.album_image}" alt="cover art" id="cover-art">
                
                        </div>

                        <div class="search-details">

                            <p id="search-title">${music.name}</p>

                            <p id="search-artist">${music.artist_name}</p>

                            <p id="search-dets">
                                Produced by: ${music.artist_idstr} 
                                <span class="sere"></span>
                                Released date: ${music.releasedate} <br> <br> 
                                Duration: ${music.duration}mins 
                            </p>
 
                        </div>
                
                        
                    </div>
            `;

            mainMain.innerHTML = searchContainer
            header.style.display = 'none'
        });
    });


    const searchInput = document.querySelector('#search');
    const searchIcon = document.querySelector('#search-icon');

    searchIcon.addEventListener('click', () => {
        const searchTrack = data.find((music) => music.name.toLowerCase() === searchInput.value.toLowerCase())
        
        if (searchTrack) {

            const searchContainer = `
             <div class="search-box">

                        <div class="search-image">
                            <img src="${searchTrack.album_image}" alt="cover art" id="cover-art">
                
                        </div>

                        <div class="search-details">

                            <p id="search-title">${searchTrack.name}</p>

                            <p id="search-artist">${searchTrack.artist_name}</p>
 
                        </div>
                
                        
                    </div>
            `;

            mainMain.innerHTML = searchContainer
            header.style.display = 'none'
        }else {
            alert("No Music with such name found")
        }
    
    })


}
