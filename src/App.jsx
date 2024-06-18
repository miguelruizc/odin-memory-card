import Card from './Card.jsx';

function App() {
	return (
		<>
			<div className="title">
				<h1>Memory Cards</h1>
			</div>
			<div className="scores">
				<p>Highest score: {100}</p>
				<p>Current score: {99}</p>
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
