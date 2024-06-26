/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { capitalize } from './helpers';
import pokeball from './assets/pokeball.png';

const Card = ({ pokemonNumber = 25, clickHandler, losingCard = false, winningCard = false }) => {
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
	}, [pokemonNumber]);

	let style = {};
	if (losingCard) {
		style.backgroundColor = '#ff4242';
		style.color = 'white';
	}
	if (winningCard) {
		let color = '#0075ff';
		style.backgroundColor = '#ffffff';
		style.color = color;
		style.border = `2px solid ${color}`;
	}

	return (
		<>
			{isPending && (
				<div className="card">
					<h2>Loading...</h2>
					<img src={pokeball}></img>
				</div>
			)}
			{error && (
				<div className="card">
					<h2>{error}</h2>
					<img src={pokeball}></img>
				</div>
			)}
			{name && (
				<div className="card" onClick={() => clickHandler(pokemonNumber)} style={style}>
					<h2>{name}</h2>
					<img src={sprite}></img>
				</div>
			)}
		</>
	);
};

export default Card;
