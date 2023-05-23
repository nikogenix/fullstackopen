import { useState } from "react";
import axios from "axios";

import { DiaryEntry } from "../types";

import Notification from "./Notification";

const Form = ({
	diaries,
	setDiaries,
}: {
	diaries: DiaryEntry[];
	setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState("");
	const [weather, setWeather] = useState("");
	const [comment, setComment] = useState("");

	const [message, setMessage] = useState("");

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		try {
			const response = await axios.post("http://localhost:3000/api/diaries", {
				date,
				visibility,
				weather,
				comment,
			});
			setDiaries(diaries.concat(response.data) as DiaryEntry[]);
			setDate("");
			setVisibility("");
			setWeather("");
			setComment("");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				handleNotification(error?.response?.data);
			} else {
				console.error(error);
			}
		}
	};

	const handleNotification = (error: string) => {
		setMessage(error);
		setTimeout(() => {
			setMessage("");
		}, 5000);
	};

	return (
		<>
			<Notification message={message} />
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>date:</legend>
					<input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
				</fieldset>

				<fieldset>
					<legend>visibility:</legend>
					<label>
						<input
							type="radio"
							name="visibility"
							value="great"
							checked={visibility === "great"}
							onChange={() => setVisibility("great")}
						/>
						great
					</label>
					<label>
						<input
							type="radio"
							name="visibility"
							value="good"
							checked={visibility === "good"}
							onChange={() => setVisibility("good")}
						/>
						good
					</label>
					<label>
						<input
							type="radio"
							name="visibility"
							value="ok"
							checked={visibility === "ok"}
							onChange={() => setVisibility("ok")}
						/>
						ok
					</label>
					<label>
						<input
							type="radio"
							name="visibility"
							value="poor"
							checked={visibility === "poor"}
							onChange={() => setVisibility("poor")}
						/>
						poor
					</label>
				</fieldset>

				<fieldset>
					<legend>weather:</legend>
					<label>
						<input
							type="radio"
							name="weather"
							value="sunny"
							checked={weather === "sunny"}
							onChange={() => setWeather("sunny")}
						/>
						sunny
					</label>
					<label>
						<input
							type="radio"
							name="weather"
							value="rainy"
							checked={weather === "rainy"}
							onChange={() => setWeather("rainy")}
						/>
						rainy
					</label>
					<label>
						<input
							type="radio"
							name="weather"
							value="cloudy"
							checked={weather === "cloudy"}
							onChange={() => setWeather("cloudy")}
						/>
						cloudy
					</label>
					<label>
						<input
							type="radio"
							name="weather"
							value="stormy"
							checked={weather === "stormy"}
							onChange={() => setWeather("stormy")}
						/>
						stormy
					</label>
					<label>
						<input
							type="radio"
							name="weather"
							value="windy"
							checked={weather === "windy"}
							onChange={() => setWeather("windy")}
						/>
						windy
					</label>
				</fieldset>

				<fieldset>
					<legend>comment:</legend>
					<textarea rows={4} cols={50} value={comment} onChange={(event) => setComment(event.target.value)} />
				</fieldset>

				<button type="submit">add</button>
			</form>
		</>
	);
};

export default Form;
