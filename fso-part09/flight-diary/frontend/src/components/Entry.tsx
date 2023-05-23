import { DiaryEntry } from "../types";

const Entry = (props: { key: number; diary: DiaryEntry }) => {
	return (
		<div>
			<h3> {props.diary.date} </h3>
			<p>visibility: {props.diary.visibility}</p>
			<p>weather: {props.diary.weather}</p>
		</div>
	);
};

export default Entry;
