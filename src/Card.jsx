import { useEffect, useState } from 'react';
import { capitalize } from './helpers';

const Card = (pokemonNumber) => {
	const [name, setName] = useState(null);
	const [sprite, setSprite] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
			.then((response) => {
				if (!response.ok) {
					console.log(response.status);
					throw new Error('HTTP error!');
				}
				response.json().then((data) => {
					setName(capitalize(data.name));
					setSprite(data.sprites.front_default);
					setIsPending(false);
				});
			})
			.catch((err) => {
				setError(err.message);
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
