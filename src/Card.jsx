import { useEffect, useState } from 'react';

const Card = () => {
	const [name, setName] = useState(null);
	const [sprite, setSprite] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const randomPokemon = Math.floor(Math.random() * 386) + 1;

		fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
			.then((response) => {
				if (!response.ok) {
					console.log(response.status);
					throw new Error('HTTP error!');
				}
				response.json().then((data) => {
					setName(data.name);
					setSprite(data.sprites.front_default);
					setIsPending(false);
				});
			})
			.catch((err) => {
				setError(err);
				setIsPending(false);
				console.error('Error fetching data', err);
			});
	}, []);

	return (
		<div className="card">
			{isPending && (
				<>
					<h2>Loading...</h2>
					<img src="./src/assets/pokeball.png"></img>
				</>
			)}
			{error && (
				<>
					<h2>{error}</h2>
					<img src="./src/assets/pokeball.png"></img>
				</>
			)}
			{name && (
				<>
					<h2>{name}</h2>
					<img src={sprite}></img>
				</>
			)}
		</div>
	);
};

export default Card;
