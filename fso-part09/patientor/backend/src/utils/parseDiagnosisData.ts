import { Diagnosis, Discharge, EntryWithoutId, HealthCheckRating, NewBaseEntry, SickLeave } from "../types";

const parseDiagnosisData = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== "object" || !("type" in object)) {
		throw new Error("Incorrect or missing data");
	}

	if ("description" in object && "date" in object && "specialist" in object) {
		const baseEntry: NewBaseEntry = {
			description: object.description as string,
			date: object.date as string,
			specialist: object.specialist as string,
		};

		const codes =
			"diagnosisCodes" in object
				? (object.diagnosisCodes as Array<Diagnosis["code"]>)
				: ([] as Array<Diagnosis["code"]>);

		if (object.type === "HealthCheck" && "healthCheckRating" in object) {
			const entryDetails = { healthCheckRating: object.healthCheckRating as HealthCheckRating };
			const newEntry: EntryWithoutId = {
				...baseEntry,
				diagnosisCodes: codes,
				...entryDetails,
				type: object.type,
			};
			return newEntry;
		} else if (object.type === "Hospital" && "discharge" in object) {
			const entryDetails = { discharge: object.discharge as Discharge };
			const newEntry: EntryWithoutId = {
				...baseEntry,
				diagnosisCodes: codes,
				...entryDetails,
				type: object.type,
			};
			return newEntry;
		} else if (object.type === "OccupationalHealthcare" && "employerName" in object) {
			const entryDetails =
				"sickLeave" in object
					? { employerName: object.employerName as string, sickLeave: object.sickLeave as SickLeave }
					: { employerName: object.employerName as string };
			const newEntry: EntryWithoutId = {
				...baseEntry,
				diagnosisCodes: codes,
				...entryDetails,
				type: object.type,
			};
			return newEntry;
		} else throw new Error("Incorrect data: some fields are missing");
	}

	throw new Error("Incorrect data: some fields are missing");
};

export default parseDiagnosisData;
