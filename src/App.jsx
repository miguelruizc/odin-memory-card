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
	const [numCards, setNumCards] = useState(MIN_CARDS);
	const [cardsArray, setCardsArray] = useState([]);

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
			<div className="board">
				<Card />
			</div>
		</>
	);
}

export default App;
