import { useState } from 'react';
import Card from './Card.jsx';

const MIN_CARDS = 2;
const MAX_CARDS = 99;

function App() {
	const [highestScore, setHighestScore] = useState(0);
	const [currentScore, setCurrentScore] = useState(0);
	const [scoreMultiplier, setScoreMultiplier] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [numCards, setNumCards] = useState(1);
	const [pokemonUsed, setPokemonUsed] = useState([25]);
	const [cards, setCards] = useState([1, 2, 3, 4, 25]);

	const cardList = cards.map((element) => {
		return <Card key={element} pokemonNumber={element} />;
	});

	return (
		<>
			<div className="title">
				<h1>Memory Cards</h1>
			</div>
			<div className="scores">
				<p>Highest score: {highestScore}</p>
				<p>Current score: {currentScore}</p>
			</div>
			<div className="game-info">
				<button>Play</button>
				<label>Number of cards: </label>
				<input type="number" title="Additional cards acts increase score multiplier" />
			</div>
			<div className="board">{cardList}</div>
		</>
	);
}

export default App;
