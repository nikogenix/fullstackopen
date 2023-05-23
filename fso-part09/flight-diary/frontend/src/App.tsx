import { useState, useEffect } from "react";
import axios from "axios";

import { DiaryEntry } from "./types";

import Entries from "./components/Entries";
import Form from "./components/Form";

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		axios.get("http://localhost:3000/api/diaries").then((response) => {
			setDiaries(response.data as DiaryEntry[]);
		});
	}, []);

	return (
		<>
			<h1>Flight Diary</h1>
			<Form diaries={diaries} setDiaries={setDiaries} />
			<Entries diaries={diaries} />
		</>
	);
};

export default App;
