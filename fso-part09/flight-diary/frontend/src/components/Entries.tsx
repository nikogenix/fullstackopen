import { DiaryEntry } from "../types";
import Entry from "./Entry";

const Entries = ({ diaries }: { diaries: DiaryEntry[] }) => {
	return (
		<>
			{diaries.map((d) => (
				<Entry key={d.id} diary={d} />
			))}
		</>
	);
};

export default Entries;
