async function fetchMusic(){
    const MY_API = ''
    try{
        const res = await fetch(MY_API)
        if(!res.ok){
            throw new Error(res.status, 'fail to load dashboard, please refresh the page')
        }

        const data = await res.json()
        displayMusic(data)

    }
    catch(e){
        alert(e)
        
    }
}

fetchMusic();

function displayMusic(data){
   
}