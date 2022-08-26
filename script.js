const pokemon_container = document.getElementById('poke_container')
const number_pokemon = 150
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}
const main_type = Object.keys(colors)
console.log(main_type)
const fetchPokemons = async () => {
    for (let i = 1; i <= number_pokemon; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const data = await fetch(url)
    const pokemon = await data.json()
    createCard(pokemon)
}

fetchPokemons()

function createCard(pokemon){
    const cardElement = document.createElement('div')
    const name = pokemon.name.charAt(0).toUpperCase()  + pokemon.name.slice(1)
    const types = pokemon.types[0].type.name.charAt(0).toUpperCase()  + pokemon.types[0].type.name.slice(1)
    const poke_types = pokemon.types.map(type => type.type.name)
	const type = main_type.find(type => poke_types.indexOf(type) > -1)
	const color = colors[type]
	
	cardElement.style.backgroundColor = color

    cardElement.classList.add('pokemon')
    const htmls = `
    <div class='info'>
      <div class='img-container'>
        <img  class='img' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png'>
      </div>
        <span class='number'>#${pokemon.id.toString().padStart(3, '0')}</span>
        <h3 class='name'>${name}</h3>
            <small>
            <span class='type'>Type:
            ${types}
            </small>
        </span>
        
    </div>
    `
    cardElement.innerHTML = htmls
    pokemon_container.appendChild(cardElement)
}
