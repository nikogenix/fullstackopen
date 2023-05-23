import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
	console.log(parts);

	return (
		<>
			{parts.map((p) => (
				<Part key={p.name} part={p} />
			))}
		</>
	);
};

export default Content;
