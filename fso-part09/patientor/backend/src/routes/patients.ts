import express from "express";
import patientsService from "../services/patientsService";
import parsePatientData from "../utils/parsePatientData";

const router = express.Router();

router.get("/", (_req, res) => {
	const data = patientsService.getRedactedPatients();
	res.send(data);
});

router.post("/", (req, res) => {
	try {
		const newPatient = parsePatientData(req.body);
		const patient = patientsService.addPatient(newPatient);
		res.json(patient);
	} catch (error: unknown) {
		let errorMessage = "Something went wrong.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
