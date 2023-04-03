const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
	<li>
		{part.name} {part.exercises}
	</li>
);
const Content = ({ parts }) => (
	<ul>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</ul>
);

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total sum={course.parts.reduce((acc, c) => acc + c.exercises, 0)} />
		</div>
	);
};

const Courses = ({ courses }) => (
	<>
		{courses.map((course) => (
			<Course key={course.id} course={course} />
		))}
	</>
);

export default Courses;
