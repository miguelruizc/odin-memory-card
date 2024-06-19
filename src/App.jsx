import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { generateRandomCards, shuffle } from './helpers.js';

const INITIAL_CARDS = 5;

function App() {
	const [highestScore, setHighestScore] = useState(0);
	const [currentScore, setCurrentScore] = useState(0);
	const [scoreMultiplier, setScoreMultiplier] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isWon, setIsWon] = useState(false);
	const [isLost, setIsLost] = useState(false);
	const [numCards, setNumCards] = useState(INITIAL_CARDS);
	const [cards, setCards] = useState(generateRandomCards(numCards));
	const [losingCard, setLosingCard] = useState(null);
	const [winningCards, setWinningCards] = useState(null);
	const [isInitialScreen, setIsInitialScreen] = useState(true);

	useEffect(() => {
		// Check if all cards became clicked+

		if (cards.every((element) => element.isClicked === true)) {
			endGame(true);
			setWinningCards(true);
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
				endGame(false);
				setLosingCard(id);
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
		if (element.id === losingCard)
			return (
				<Card
					key={element.id}
					pokemonNumber={element.id}
					clickHandler={cardClickHandler}
					losingCard={true}
				/>
			);
		else if (winningCards) {
			return (
				<Card
					key={element.id}
					pokemonNumber={element.id}
					clickHandler={cardClickHandler}
					winningCard={winningCards}
				/>
			);
		} else
			return (
				<Card key={element.id} pokemonNumber={element.id} clickHandler={cardClickHandler} />
			);
	});

	useEffect(() => {
		setCards(generateRandomCards(numCards));
	}, [numCards]);

	const play = () => {
		setIsPlaying(true);
		setIsWon(false);
		setIsLost(false);
		setIsInitialScreen(false);
	};

	const endGame = (won) => {
		if (won) {
			setIsWon(true);
			setIsLost(false);
		} else {
			setIsLost(true);
			setIsWon(false);
			if (currentScore > highestScore) setHighestScore(currentScore);
		}

		setIsPlaying(false);
	};

	const playAgain = () => {
		// Reset states for a new game
		setCurrentScore(0);
		setScoreMultiplier(1);
		setIsPlaying(true);
		setIsWon(false);
		setIsLost(false);
		setNumCards(INITIAL_CARDS);
		setCards(generateRandomCards(numCards));
		setLosingCard(null);
		setWinningCards(null);
	};

	const playNext = () => {
		// Reset states for a new round
		setIsPlaying(true);
		setIsWon(false);
		setIsLost(false);
		setScoreMultiplier(scoreMultiplier + numCards);
		setNumCards(numCards + 1);
		setCards(generateRandomCards(numCards + 1));
		setLosingCard(null);
		setWinningCards(null);
	};

	return (
		<>
			<div className="title">
				<h1>Memory Cards</h1>
			</div>
			{!isInitialScreen && (
				<div className="scores">
					<div className="scores-left">
						<p>
							Score: <strong>{currentScore}</strong>
						</p>
						<p>
							Multiplier: <strong>{scoreMultiplier}</strong>
						</p>
					</div>
					<hr></hr>
					<p>
						Highest: <strong>{highestScore}</strong>
					</p>
				</div>
			)}

			{!isPlaying && !isWon && !isLost && (
				<div className="game-info">
					<button onClick={play}>Play</button>
				</div>
			)}
			{isLost && (
				<div className="game-info">
					<p>Game over </p>
					<p className="final-score">
						<strong>Score: {currentScore}</strong>
					</p>
					<button onClick={playAgain}>Play again</button>
				</div>
			)}
			{isWon && (
				<div className="game-info">
					<p>Round won!</p>
					<strong>
						<p className="reward">Reward:</p>
					</strong>
					<button onClick={playNext}>Score Multiplier +{numCards}</button>
				</div>
			)}

			{!isInitialScreen && <div className="board">{cardList}</div>}

			{isPlaying && (
				<div className="game-info">
					<p>
						Click each card <b>once</b> to score
					</p>
				</div>
			)}
		</>
	);
}

export default App;
