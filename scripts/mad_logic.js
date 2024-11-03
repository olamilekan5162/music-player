const mainMain = document.querySelector('.main-main')
const header = document.querySelector('.header')

// const MY_API = 'https://api.deezer.com/search?q=pop'
// const MY_API = 'https://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=a35ee8fa0422bab3ab5e3aec2c51120c&format=json';
const MY_API = 'https://api.jamendo.com/v3.0/tracks/?client_id=e7ce9afa&format=jsonpretty&limit=50&fuzzytags=groove+rock&speed=high+veryhigh';

const fetchMusic = async () => {
    try{

        const res = await fetch(MY_API)
        if(!res.ok){
            throw new Error('fail to load dashboard, please refresh the page')
        }

        const data = await res.json()
        displayMusic(data.results)

    }
    catch(e){
        console.error(e)
        
    }
}

fetchMusic();

const  displayMusic = (data) => {

    mainMain.innerHTML = ''

    data.forEach((music) => {

       const trackBox = document.createElement('div');
       trackBox.className = 'track-box';

       const trackImage = document.createElement('div');
       trackImage.className = 'track-image';

       const image = document.createElement('img');
       image.id = 'cover-art'
       image.alt = 'cover art'
       image.src = music.album_image

       trackImage.appendChild(image)

       const trackTitle = document.createElement('p');
       trackTitle.id = 'track-title'
       trackTitle.textContent = music.name

       const artistName = document.createElement('p');
       artistName.id = 'track-artist'
       artistName.textContent = music.artist_name

       trackBox.appendChild(trackImage)
       trackBox.appendChild(trackTitle)
       trackBox.appendChild(artistName)

        mainMain.appendChild(trackBox)
    });


    const trackBox = document.querySelectorAll('.track-box')

    trackBox.forEach((track, index) => {

        track.addEventListener('click', () => {

            const music = data[index]

            const searchBox = document.createElement('div');
            searchBox.className = 'search-box';

            const searchImage = document.createElement('div');
            searchImage.className = 'search-image';

            const image = document.createElement('img');
            image.id = 'cover-art'
            image.alt = 'cover-art'
            image.src = music.album_image

            searchImage.appendChild(image)
            searchBox.appendChild(searchImage)

            const searchDetails = document.createElement('div');
            searchDetails.className = 'search-details';

            const searchTitle = document.createElement('p');
            searchTitle.id = 'search-title'
            searchTitle.textContent = music.name

            const searchArtist = document.createElement('p');
            searchArtist.id = 'search-artist'
            searchArtist.textContent = music.artist_name

            const searchDets = document.createElement('p');
            searchDets.id = 'search-dets'
            searchDets.innerHTML = `
                Produced by: ${music.artist_idstr} <br> <br>
                Released date: ${music.releasedate}  
                <span class="circle"></span>
                Duration: ${music.duration} mins

            `
            searchDetails.appendChild(searchTitle);
            searchDetails.appendChild(searchArtist);
            searchDetails.appendChild(searchDets);
            

            const downloadPlay = document.createElement('div');
            downloadPlay.className = 'download-play';

            const play = document.createElement('img');
            play.id = 'play'
            play.alt = 'play button'
            play.src = 'images/play-circle.svg'

            const download = document.createElement('a');
            download.id = 'download'
            download.href = music.audiodownload
            download.textContent = 'download'

            downloadPlay.appendChild(play)
            downloadPlay.appendChild(download)

            searchDetails.appendChild(downloadPlay)
            searchBox.appendChild(searchDetails)
 
            mainMain.innerHTML = ''
            mainMain.appendChild(searchBox)
            header.style.display = 'none'

            const player = document.querySelector('#player')

            play.addEventListener('click', () => {
                if (player.paused){
                    player.src = music.audio; 
                    player.play();
                    play.src = 'images/stop-circle.svg'
                }else{
                    player.pause();
                    play.src = 'images/play-circle.svg'
                }
                
            });

        });
    });


    const searchInput = document.querySelector('#search');
    const form = document.querySelector('form')

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const music = data.find((music) => music.name.toLowerCase() === searchInput.value.toLowerCase())
        
        if (music) {

            const searchBox = document.createElement('div');
            searchBox.className = 'search-box';

            const searchImage = document.createElement('div');
            searchImage.className = 'search-image';

            const image = document.createElement('img');
            image.id = 'cover-art'
            image.alt = 'cover-art'
            image.src = music.album_image

            searchImage.appendChild(image)
            searchBox.appendChild(searchImage)

            const searchDetails = document.createElement('div');
            searchDetails.className = 'search-details';

            const searchTitle = document.createElement('p');
            searchTitle.id = 'search-title'
            searchTitle.textContent = music.name

            const searchArtist = document.createElement('p');
            searchArtist.id = 'search-artist'
            searchArtist.textContent = music.artist_name

            const searchDets = document.createElement('p');
            searchDets.id = 'search-dets'
            searchDets.innerHTML = `
                Produced by: ${music.artist_idstr} <br> <br>
                Released date: ${music.releasedate}  
                <span class="circle"></span>
                Duration: ${music.duration} mins

            `
            searchDetails.appendChild(searchTitle);
            searchDetails.appendChild(searchArtist);
            searchDetails.appendChild(searchDets);
            

            const downloadPlay = document.createElement('div');
            downloadPlay.className = 'download-play';

            const play = document.createElement('img');
            play.id = 'play'
            play.alt = 'play button'
            play.src = 'images/play-circle.svg'

            const download = document.createElement('a');
            download.id = 'download'
            download.href = music.audiodownload
            download.textContent = 'download'

            downloadPlay.appendChild(play)
            downloadPlay.appendChild(download)

            searchDetails.appendChild(downloadPlay)
            searchBox.appendChild(searchDetails)
 
            mainMain.innerHTML = ''
            mainMain.appendChild(searchBox)
            header.style.display = 'none'

            const player = document.querySelector('#player')

            play.addEventListener('click', () => {
                if (player.paused){
                    player.src = music.audio; 
                    player.play();
                    play.src = 'images/stop-circle.svg'
                }else{
                    player.pause();
                    play.src = 'images/play-circle.svg'
                }  
            });

        }else {
            alert("No Music with such name found")
        }
    
    })

}