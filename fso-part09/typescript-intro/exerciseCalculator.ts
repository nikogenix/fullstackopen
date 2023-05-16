interface InputExercises {
	goal: number;
	training: number[];
}

const parseExercises = (args: string[]): InputExercises => {
	if (args.length < 4) throw new Error("Not enough arguments");

	const [, , goal, ...training] = args;
	const trainingToNum = training.map((t) => Number(t));

	if (!isNaN(Number(goal)) && !trainingToNum.includes(NaN)) {
		return {
			goal: Number(goal),
			training: trainingToNum,
		};
	} else {
		throw new Error("Provided values were not numbers!");
	}
};

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

/**
 * @param training - each num in arr represents the hours of training for that day
 * @param goal - average daily training goal
 * @example - 2 1 0 2 4.5 0 3 1 0 4
 *            | [    training     ]
 *           goal
 */
const calculateExercises = (training: number[], goal: number): Result => {
	const periodLength = training.length,
		trainingDays = training.filter((day) => day !== 0).length,
		rating = Math.floor(Math.random() * 3) + 1,
		ratingDescription = rating === 1 ? "bad" : rating === 2 ? "meh" : "good",
		target = goal,
		average = training.reduce((acc, c) => acc + c, 0) / training.length,
		success = average >= target;

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const { goal, training } = parseExercises(process.argv);
	console.log(calculateExercises(training, goal));
} catch (error: unknown) {
	let errorMessage = "Something bad happened.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}
