const pokemons = ['Charmander', 'Charizard', 'Pikachu', 'Raichu', 'Squirtle', 'Blastoise', 'Bulbasaur', 'Venusaur']

// Get Data from API and return an array of promises
const getPokemonsPromisesData = (arr) => {
	return arr.map((pokemon) =>	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`))
}

// extract info from each promise and return an array of objects
const extractInfoFromPromises = (arr) => {
	let pokeInfos = [];
	arr.forEach((promiseItem, index) => {
		promiseItem
		.then((data) => data.json())
		.then((result) => {
			pokeInfos.push(result)
			if (arr.length - 1 === index)
				parsePokeInfo(pokeInfos)
		});
	});
}

// capitalizes first letter of name
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// parse pokemon array according to type
const parsePokeInfo = ((pokemonArray) => {
	const final = pokemonArray.reduce((finalObject, pokemon) => {
		let typeArray = pokemon.types.map((type) => type.type.name);
		typeArray.map((type) => {
			if (!finalObject[type]) finalObject[type] = [];
			finalObject[type].push(capitalizeFirstLetter(pokemon.name));
		});
		return finalObject;
	}, {});
	console.log(final)
});

// function calls
extractInfoFromPromises(getPokemonsPromisesData(pokemons));