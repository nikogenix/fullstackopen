import { useState, useEffect } from "react";
import axios from "axios";
const countryUrl = "https://restcountries.com/v3.1/name/";
const api_key = process.env.REACT_APP_OPEN_WEATHER_MAP_APY_KEY;
const weatherUrl = (lat, lon) =>
	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

const Filter = ({ filter, handleFilterChange }) => (
	<div>
		Search for countries: <input value={filter} onChange={handleFilterChange} />
	</div>
);

const Notification = ({ message }) => {
	if (message === null) return null;
	else return <div>{message}</div>;
};

const Results = ({ results }) => {
	if (results.length === 0) return null;
	else
		return (
			<>
				{results.map((country) => (
					<Country
						results={results}
						key={country.name.common}
						name={country.name.common}
						capital={country.capital === undefined ? "N/A" : country.capital[0]}
						languages={[country.languages]}
						flag={country.flags.png}
						latlng={country.latlng}
					/>
				))}
			</>
		);
};

const Country = ({ results, name, capital, languages, flag, latlng }) => {
	const [hidden, setHidden] = useState(true);
	const hiddenStyle = { display: "none" };
	const blockStyle = { display: "flex", gap: 100 };
	const handleClick = (e) => {
		setHidden(!hidden);
	};

	useEffect(() => {
		if (results.length === 1) setHidden(false);
	}, [results]);

	return (
		<>
			<div style={{ display: "flex", alignItems: "center" }}>
				<img style={{ float: "left" }} width={"auto"} height={30} src={flag} alt={`The flag of ${name}`} />
				<h2 style={{ float: "left", margin: 5 }}>{name}</h2>
				<button onClick={handleClick}>{hidden ? "show" : "hide"}</button>
			</div>

			<div style={hidden ? hiddenStyle : blockStyle}>
				<div>
					<div>Capital: {capital}</div>
					<div>
						Languages:
						<ul>
							{Object.keys(languages[0]).map((c) => {
								return <li key={c}>{languages[0][c]}</li>;
							})}
						</ul>
					</div>
				</div>
				<Weather lat={latlng[0]} lng={latlng[1]} />
			</div>
		</>
	);
};

const Weather = ({ lat, lng }) => {
	const [temp, setTemp] = useState(null);
	const [feelsLike, setFeelsLike] = useState(null);
	const [icon, setIcon] = useState(null);

	useEffect(() => {
		axios.get(weatherUrl(lat, lng)).then((res) => {
			setTemp(res.data.main.temp);
			setFeelsLike(res.data.main.feels_like);
			setIcon(res.data.weather[0].icon);
		});
	});

	return (
		<div>
			<div>Temperature: {temp}°C</div>
			<div>Feels like: {feelsLike}°C</div>
			<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
		</div>
	);
};

function App() {
	const [filter, setFilter] = useState("");
	const [results, setResults] = useState([]);
	const [message, setMessage] = useState(null);

	const search = (country) => {
		axios
			.get(`${countryUrl}${country}`)
			.then((res) => {
				if (res.data.length > 10) {
					setResults([]);
					setMessage("Too many matches");
				} else if (res.data.length === 0) {
					setResults([]);
					setMessage("No matches found");
				} else {
					setResults(res.data);
					setMessage(null);
				}
			})
			.catch((err) => {
				setResults([]);
				setMessage("No matches found");
			});
	};

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
		search(e.target.value);
	};

	return (
		<>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<Notification message={message} />
			<Results results={results} />
		</>
	);
}

export default App;
