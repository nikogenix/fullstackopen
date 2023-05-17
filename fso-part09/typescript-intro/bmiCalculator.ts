interface InputBMI {
	h: number;
	w: number;
}

const parseBMI = (args: string[]): InputBMI => {
	if (args.length < 4) throw new Error("Not enough arguments");
	if (args.length > 4) throw new Error("Too many arguments");

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			h: Number(args[2]),
			w: Number(args[3]),
		};
	} else {
		throw new Error("Provided values were not numbers!");
	}
};

type BMICategory = "underweight" | "normal range" | "overweight" | "obese";

/**
 * @param h - height in cm
 * @param w - weight in kg
 * @returns BMI category
 * @examples - 180, 74 => normal range
 * 			 - 180, 91 => overweight
 */
export const bmiCalculator = (h: number, w: number): BMICategory => {
	const bmi = (w / h / h) * 10000;

	if (bmi < 18.5) return "underweight";
	else if (bmi >= 18.5 && bmi < 25) return "normal range";
	else if (bmi >= 25 && bmi < 30) return "overweight";
	else return "obese";
};

if (require.main === module) {
	try {
		const { h, w } = parseBMI(process.argv);
		console.log(bmiCalculator(h, w));
	} catch (error: unknown) {
		let errorMessage = "Something bad happened.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		console.log(errorMessage);
	}
}
