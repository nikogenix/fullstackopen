import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
	const data = patientsService.getRedactedPatients();
	res.send(data);
});

router.post("/", (_req, res) => {
	res.send("Saving patient");
});

export default router;
