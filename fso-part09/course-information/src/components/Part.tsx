import { CoursePart } from "../types";
import { assertNever } from "../utils/utils";

const Part = (props: { key: string; part: CoursePart }) => {
	switch (props.part.kind) {
		case "basic":
			return (
				<div>
					<h3>
						{props.part.name} | Exercises: {props.part.exerciseCount}
					</h3>
					<p>Description: {props.part.description}</p>
				</div>
			);
		case "group":
			return (
				<div>
					<h3>
						{props.part.name} | Exercises: {props.part.exerciseCount}
					</h3>
					<p>Group exercises: {props.part.groupProjectCount}</p>
				</div>
			);
		case "background":
			return (
				<div>
					<h3>
						{props.part.name} | Exercises: {props.part.exerciseCount}
					</h3>
					<p>Description: {props.part.description}</p>
					<p>Material: {props.part.backgroundMaterial}</p>
				</div>
			);
		case "special":
			return (
				<div>
					<h3>
						{props.part.name} | Exercises: {props.part.exerciseCount}
					</h3>
					<p>Description: {props.part.description}</p>
					<p>Requirements: {props.part.requirements.join(", ")}</p>
				</div>
			);
		default:
			return assertNever(props.part);
	}
};

export default Part;
