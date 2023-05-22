interface Props {
	parts: { name: string; exerciseCount: number }[];
}

const Content = ({ parts }: Props) => {
	return (
		<>
			{parts.map((part) => (
				<p key={part.name}>
					{part.name} {part.exerciseCount}
				</p>
			))}
		</>
	);
};

export default Content;
