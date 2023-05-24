import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient } from "../types";

import patientService from "../services/patients";

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const fetchPatient = async () => {
			if (id) {
				try {
					const patient = await patientService.getOne(id);
					setPatient(patient);
				} catch {
					setError(true);
				}
			}
		};
		void fetchPatient();
	}, [id]);

	if (error) return <div style={{ marginTop: 20 }}>patient not found</div>;

	if (patient === null || patient === undefined) return <div style={{ marginTop: 20 }}>loading...</div>;

	return (
		<div style={{ marginTop: 20 }}>
			<Box>
				<Typography variant="h5">
					{patient.name} {patient.gender === "female" && <FemaleIcon />}
					{patient.gender === "male" && <MaleIcon />}
					{patient.gender === "other" && <TransgenderIcon />}
				</Typography>

				<Typography>SSN: {patient.ssn}</Typography>
				<Typography>occupation: {patient.occupation}</Typography>
			</Box>
		</div>
	);
};

export default PatientPage;
