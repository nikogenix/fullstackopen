import { Entry, Gender, NewPatient } from "../types";

const parsePatientData = (object: unknown): NewPatient => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"name" in object &&
		"ssn" in object &&
		"dateOfBirth" in object &&
		"gender" in object &&
		"occupation" in object
	) {
		const newPatient: NewPatient = {
			name: parseString(object.name),
			ssn: parseString(object.ssn),
			dateOfBirth: parseDate(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseString(object.occupation),
			entries: [] as Entry[],
		};

		return newPatient;
	}

	throw new Error("Incorrect data: some fields are missing");
};

const parseString = (input: unknown): string => {
	if (!input || !isString(input)) {
		throw new Error("Incorrect or missing info");
	}

	return input;
};

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error("Incorrect or missing date");
	}
	return date;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender);
	}
	return gender;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

export default parsePatientData;
