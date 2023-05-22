interface Props {
	count: number;
}

const Total = ({ count }: Props) => {
	return <p>Number of exercises: {count}</p>;
};

export default Total;
