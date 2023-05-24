import patientsData from "../../data/patients";
import { NewPatient, Patient, RedactedPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
	return patients;
};

const getRedactedPatients = (): RedactedPatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const getPatient = (id: string): Patient | undefined => {
	return patients.find((p) => p.id === id);
};

const addPatient = (newPatient: NewPatient): RedactedPatient => {
	const patient: Patient = {
		id: (uuid as () => string)(),
		...newPatient,
	};
	patients.push(patient);

	const redactedPatient: RedactedPatient = {
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation,
	};
	return redactedPatient;
};

export default {
	getPatients,
	getRedactedPatients,
	getPatient,
	addPatient,
};
