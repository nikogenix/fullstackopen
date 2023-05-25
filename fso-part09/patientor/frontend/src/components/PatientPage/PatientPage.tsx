import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Diagnosis, EntryWithoutId, Patient } from "../../types";

import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import axios from "axios";
import AddDiagnosisModal from "../AddDiagnosisModal";

interface PatientProps {
	diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientProps) => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [formError, setFormError] = useState<string>();

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(false);
	};

	const submitNewEntry = async (values: EntryWithoutId) => {
		try {
			if (patient) {
				const entry = await patientService.createEntry(patient?.id, values);
				const updatedPatient = { ...patient, entries: [...patient.entries, entry] };
				setPatient(updatedPatient);
				setModalOpen(false);
			}
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === "string") {
					const message = e.response.data.replace("Something went wrong. Error: ", "");
					console.error(message);
					setFormError(message);
				} else {
					setFormError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", e);
				setFormError("Unknown error");
			}
		}
	};

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

				<AddDiagnosisModal
					modalOpen={modalOpen}
					onSubmit={submitNewEntry}
					error={formError}
					onClose={closeModal}
					diagnoses={diagnoses}
				/>
				<Button variant="contained" onClick={() => openModal()}>
					Add New Entry
				</Button>

				{patient.entries.length === 0 && (
					<Typography variant="h6" style={{ marginTop: 20 }}>
						no entries
					</Typography>
				)}
				{patient.entries.length > 0 && (
					<>
						<Typography variant="h6" style={{ marginTop: 20 }}>
							entries
						</Typography>
						{patient.entries.map((e) => (
							<div key={e.id} style={{ border: "1px solid black", padding: 5 }}>
								<p>
									{e.date}: {e.description}
								</p>
								{e.diagnosisCodes && (
									<ul style={{ listStyleType: "none" }}>
										{e.diagnosisCodes.map((d) => (
											<li key={d}>
												<code style={{ fontSize: 17 }}>[{d}]</code>{" "}
												{diagnoses.find((diag) => diag.code === d)?.name}
											</li>
										))}
									</ul>
								)}
								<EntryDetails entry={e} />
								<p>diagnose by {e.specialist}</p>
							</div>
						))}
					</>
				)}
			</Box>
		</div>
	);
};

export default PatientPage;
