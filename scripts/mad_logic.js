const mainMain = document.querySelector('.main-main')

// const MY_API = 'https://api.deezer.com/search?q=pop'
const MY_API = 'https://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=a35ee8fa0422bab3ab5e3aec2c51120c&format=json';


async function fetchMusic(){
    try{

        const res = await fetch(MY_API)
        if(!res.ok){
            throw new Error('fail to load dashboard, please refresh the page')
        }

        const data = await res.json()
        displayMusic(data.results.albummatches.album)

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
                            <img src="${music.image[2]["#text"]}" id="cover-art">

                        </div>

                        <p id="track-title">${music.name}</p>

                        <p id="track-artist">${music.artist}</p>

                    </div>
        `;

        mainMain.insertAdjacentHTML('beforeend', tracksContainer)
    });

    const trackBox = document.querySelectorAll('.track-box')

    trackBox.forEach((track) => {

        track.addEventListener('click', () => {

            const searchContainer = `
             <div class="search-box">

                        <div class="search-image">
                            <img src="images/loko headshot.jpg" alt="cover art" id="cover-art">
                
                        </div>

                        <div class="search-details">

                            <p id="search-title">YOU ARE WORTHY TO BE PRAISED</p>

                            <p id="search-artist">Oracle</p>
 
                        </div>
                
                        
                    </div>
            `;

            mainMain.innerHTML = searchContainer
        });
    });


    const searchInput = document.querySelector('#search')

    searchInput.addEventListener('click', () => {
        const searchTrack = data.find((music) => music.name.toLowerCase() === searchInput.value.toLowerCase())
        if (searchTrack) {

            const searchContainer = `
             <div class="search-box">

                        <div class="search-image">
                            <img src="images/loko headshot.jpg" alt="cover art" id="cover-art">
                
                        </div>

                        <div class="search-details">

                            <p id="search-title">YOU ARE WORTHY TO BE PRAISED</p>

                            <p id="search-artist">Oracle</p>
 
                        </div>
                
                        
                    </div>
            `;

            mainMain.innerHTML = searchContainer
        }else {
            alert("No Music with such name found")
        }
    
    })


}
