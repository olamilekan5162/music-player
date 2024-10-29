async function fetchMusic(){
    const MY_API = 'https://api.deezer.com/search?q=pop'
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

        trackContainer = `
        
        `
        console.log(music.artist.name)
    });
   
}

