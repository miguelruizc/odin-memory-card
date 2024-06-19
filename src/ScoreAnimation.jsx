/* eslint-disable react/prop-types */
const ScoreAnimation = ({ scoreMultiplier, mouseCoordinates }) => {
	return (
		<span
			className="score-animation"
			style={{ top: mouseCoordinates.y, left: mouseCoordinates.x }}
		>
			+{scoreMultiplier}
		</span>
	);
};

export default ScoreAnimation;
