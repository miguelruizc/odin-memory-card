import { useEffect, useState } from 'react';

const Card = () => {
	const [name, setName] = useState('');
	const [sprite, setSprite] = useState('');

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon/25')
			.then((response) => response.json())
			.then((data) => {
				setName(data.name);
				setSprite(data.sprites.front_default);
			})
			.catch((error) => console.error('Error fetching data', error));
	}, []);

	return (
		<div className="card">
			<h2>{name}</h2>
			<img src={sprite}></img>
		</div>
	);
};

export default Card;
