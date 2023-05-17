import express from "express";

import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("hello fullstack");
});

app.get("/bmi", (req, res) => {
	const { weight, height } = req.query;

	if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
		return res.send(JSON.stringify({ weight, height, bmi: bmiCalculator(Number(height), Number(weight)) }));
	} else {
		return res.status(400).send(JSON.stringify({ error: "malformatted parameters" }));
	}
});

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
	if (!isNaN(Number(target)) && daily_exercises.every((e: any) => !isNaN(Number(e)))) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const result = calculateExercises(daily_exercises, Number(target));
		return res.send({ result });
	} else if (typeof target === "undefined" || typeof daily_exercises === "undefined") {
		console.log(typeof daily_exercises, typeof target);

		return res.status(400).send(JSON.stringify({ error: "parameters missing" }));
	} else {
		return res.status(400).send(JSON.stringify({ error: "malformatted parameters" }));
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
