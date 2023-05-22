interface Props {
	name: string;
}

const Header = ({ name }: Props) => {
	return <h1>{name}</h1>;
};

export default Header;
