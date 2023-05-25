import express from "express";
import patientsService from "../services/patientsService";
import parsePatientData from "../utils/parsePatientData";
import parseDiagnosisData from "../utils/parseDiagnosisData";

const router = express.Router();

router.get("/", (_req, res) => {
	const data = patientsService.getRedactedPatients();
	res.send(data);
});

router.get("/:id", (req, res) => {
	const data = patientsService.getPatient(req.params.id);
	if (data) res.send(data);
	else res.status(404).send({ error: "invalid id. patient not found" });
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

router.post("/:id", (req, res) => {
	try {
		const newDiagnosis = parseDiagnosisData(req.body);
		const diagnosis = patientsService.addDiagnosis(req.params.id, newDiagnosis);
		res.json(diagnosis);
	} catch (error: unknown) {
		let errorMessage = "Something went wrong.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
