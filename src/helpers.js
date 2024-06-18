export function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateUniquePokemon(amount) {
	const GEN1 = 151;
	const GEN2 = 251;
	const GEN3 = 386;
	const GEN4 = 493;
	const GEN5 = 649;
	const GEN6 = 721;
	const GEN7 = 809;
	const GEN8 = 905;
	const GEN9 = 1025;

	let array = [];

	for (let i = 0; i < amount; i++) {
		let pokemonNumber;
		do {
			pokemonNumber = Math.floor(Math.random() * GEN1) + 1;
		} while (array.includes(pokemonNumber));

		array.push(pokemonNumber);
	}

	return array;
}
