import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { generateRandomCards, shuffle } from './helpers.js';

const MIN_CARDS = 1;
const MAX_CARDS = 99;

function App() {
	const [highestScore, setHighestScore] = useState(0);
	const [currentScore, setCurrentScore] = useState(0);
	const [scoreMultiplier, setScoreMultiplier] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [numCards, setNumCards] = useState(1);
	const [cards, setCards] = useState(generateRandomCards(numCards));

	useEffect(() => {
		// Check if all cards became clicked
		if (cards.every((element) => element.isClicked === true)) {
			endGame();
		}
	}, [cards]);

	useEffect(() => {
		setCards((prev) => shuffle(prev));
	}, [currentScore]);

	const cardClickHandler = (id) => {
		//Handle click if game is ON
		if (isPlaying) {
			let target = cards.find((element) => element.id === id);

			// Already clicked target
			if (target.isClicked) {
				endGame();
			}

			// Freshly clicked
			else {
				setCards((prevState) => {
					let newState = [...prevState];
					let index = newState.indexOf(target);

					let newElement = target;
					newElement.isClicked = true;

					newState[index] = newElement;

					return newState;
				});

				// Sum score
				setCurrentScore((prev) => prev + scoreMultiplier);
			}
		}
	};

	const cardList = cards.map((element) => {
		return <Card key={element.id} pokemonNumber={element.id} clickHandler={cardClickHandler} />;
	});

	useEffect(() => {
		setCards(generateRandomCards(numCards));
		setScoreMultiplier(1); //Todo: Design a score multiplier formula
	}, [numCards]);

	const play = () => {
		setIsPlaying(true);
		setIsComplete(false);
	};

	const endGame = () => {
		setIsComplete(true);
		setIsPlaying(false);
		if (currentScore > highestScore) setHighestScore(currentScore);
	};

	const changeNumCards = (event) => {
		if (event.target.value >= MIN_CARDS && event.target.value <= MAX_CARDS) {
			setNumCards(event.target.value);
		}
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

			{!isPlaying && !isComplete && (
				<div className="game-info">
					<label>Number of cards: </label>
					<input
						type="number"
						title="Additional cards increase score multiplier"
						value={numCards}
						onChange={changeNumCards}
						min={2}
						max={50}
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
			{isComplete && (
				<div className="game-info">
					<p>Game over: </p>
					<p>Score: {currentScore}</p>
					<button>Play again</button>
				</div>
			)}

			<div className="board">{cardList}</div>
		</>
	);
}

export default App;
