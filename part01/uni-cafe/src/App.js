import { useState } from "react";

const Heading = ({ text }) => {
	return <h1>{text}</h1>;
};
const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};
const Stats = ({ stats }) => {
	if (stats.reduce((acc, c) => acc + c, 0) === 0) return <div>no feedback given</div>;
	else
		return (
			<div>
				<div>good: {stats[0]}</div>
				<div>neutral: {stats[1]}</div>
				<div>bad: {stats[2]}</div>
				<div>all: {stats.reduce((acc, c) => acc + c, 0)}</div>
				<div>average: {(stats[0] * 1 + stats[2] * -1) / stats.reduce((acc, c) => acc + c, 0) || 0}</div>
				<div>positive: {(stats[0] / stats.reduce((acc, c) => acc + c, 0)) * 100 || 0} %</div>
			</div>
		);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<Heading text={"give feedback"} />
			<Button handleClick={() => setGood(good + 1)} text={"good"} />
			<Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
			<Button handleClick={() => setBad(bad + 1)} text={"bad"} />
			<Heading text={"statistics"} />
			<Stats stats={[good, neutral, bad]} />
		</>
	);
};

export default App;
