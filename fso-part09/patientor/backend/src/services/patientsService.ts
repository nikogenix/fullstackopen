import patientsData from "../../data/patients";
import { Patient, RedactedPatient } from "../types";

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

const addPatient = () => null;

export default {
	getPatients,
	getRedactedPatients,
	addPatient,
};
