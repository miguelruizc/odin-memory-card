import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { generateUniquePokemon } from './helpers.js';

const MIN_CARDS = 2;
const MAX_CARDS = 99;

function App() {
	const [highestScore, setHighestScore] = useState(0);
	const [currentScore, setCurrentScore] = useState(0);
	const [scoreMultiplier, setScoreMultiplier] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [numCards, setNumCards] = useState(1);
	const [cards, setCards] = useState(generateUniquePokemon(numCards));

	const cardList = cards.map((element) => {
		return <Card key={element} pokemonNumber={element} />;
	});

	useEffect(() => {
		setCards(generateUniquePokemon(numCards));
		setScoreMultiplier(numCards); //Todo: Design a score multiplier formula
	}, [numCards]);

	const play = () => {
		setIsPlaying(true);
	};

	return (
		<>
			<div className="title">
				<h1>Memory Cards</h1>
			</div>
			<div className="scores">
				<p>Highest score: {highestScore}</p>
				<p>Current score: {currentScore}</p>
			</div>

			{!isPlaying && (
				<div className="game-info">
					<label>Number of cards: </label>
					<input
						type="number"
						title="Additional cards increase score multiplier"
						value={numCards}
						onChange={(event) => setNumCards(event.target.value)}
					/>
					<p>Score multiplier: {scoreMultiplier}</p>
					<button onClick={play}>Play</button>
				</div>
			)}
			{isPlaying && (
				<div className="game-info">
					<p>Click each card ONCE to score</p>
					<p>Score multiplier: {scoreMultiplier}</p>
				</div>
			)}

			<div className="board">{cardList}</div>
		</>
	);
}

export default App;
