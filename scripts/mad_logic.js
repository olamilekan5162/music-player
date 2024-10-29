const mainMain = document.querySelector('.main-main')
console.log(mainMain)
const MY_API = 'https://api.deezer.com/search?q=pop'

async function fetchMusic(){
    try{

        const res = await fetch(MY_API)
        if(!res.ok){
            throw new Error('fail to load dashboard, please refresh the page')
        }

        const data = await res.json()
        displayMusic(data.data)

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
                            <img src="${music.artist.picture_medium}" id="cover-art">

                        </div>

                        <p id="track-artist">${music.artist.name}</p>

                        <p id="track-title">${music.title}</p>

                    </div>
        `;

        mainMain.insertAdjacentHTML('beforeend', tracksContainer)
    //     console.log(music.artist.name)
    //     console.log(music.artist.picture_medium)
    //     console.log(music.title)
    });
   
}