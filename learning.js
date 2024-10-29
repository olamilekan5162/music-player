
const pokemonFetch = document.querySelector('#pokemonFetch');

async function fetchData(){
    const pokemonName = document.querySelector('#pokemonName').value.toLowerCase();
    const pokemonSprite = document.querySelector('#pokemonSprite');
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok){
            throw new Error(`There is no Pokemon with the name ${pokemonName}`)
        }

        const data = await response.json();
        pokemonSprite.src = data.sprites.front_default
        pokemonSprite.style.display = 'block'
        
        
    }
    catch(error){
        alert(error)
    }
}

pokemonFetch.addEventListener('click', fetchData)