import { useState } from 'react';

const Card = () => {
	const [name, setName] = useState('Pikachu');
	const [image, setImage] = useState('./src/assets/pikachu.png');

	return (
		<div className="card">
			<h2>{name}</h2>
			<img src={image}></img>
		</div>
	);
};

export default Card;
