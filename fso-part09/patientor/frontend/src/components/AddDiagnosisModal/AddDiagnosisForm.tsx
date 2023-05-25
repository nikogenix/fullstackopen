import { useState, SyntheticEvent } from "react";

import {
	Box,
	OutlinedInput,
	TextField,
	Chip,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	SelectChangeEvent,
} from "@mui/material";

import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface Props {
	onCancel: () => void;
	onSubmit: (values: EntryWithoutId) => void;
	diagnoses: Diagnosis[];
}

const AddDiagnosisForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
	const [type, setType] = useState("HealthCheck");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);

	const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");

	const [employerName, setEmployerName] = useState("");
	const [startLeave, setStartLeave] = useState("");
	const [endLeave, setEndLeave] = useState("");

	const onTypeChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if (typeof event.target.value === "string") {
			const value = event.target.value;
			setType(value);
		}
	};

	const onHealthCheckRatingChange = (event: SelectChangeEvent<HealthCheckRating>) => {
		event.preventDefault();
		setHealthCheckRating(event.target.value as HealthCheckRating);
	};

	const onDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
		event.preventDefault();
		setDiagnosisCodes(event.target.value as typeof diagnosisCodes);
	};

	const addDiagnosis = (event: SyntheticEvent) => {
		event.preventDefault();

		if (type === "HealthCheck") {
			onSubmit({ description, date, specialist, type, diagnosisCodes, healthCheckRating });
		}

		if (type === "Hospital") {
			onSubmit({
				description,
				date,
				specialist,
				type,
				diagnosisCodes,
				discharge: { date: dischargeDate, criteria: dischargeCriteria },
			});
		}
		if (type === "OccupationalHealthcare") {
			onSubmit({
				description,
				date,
				specialist,
				type,
				diagnosisCodes,
				employerName,
				sickLeave: { startDate: startLeave, endDate: endLeave },
			});
		}
	};

	return (
		<div>
			<form onSubmit={addDiagnosis}>
				<InputLabel>Type</InputLabel>
				<Select label="Type" fullWidth value={type} onChange={onTypeChange} style={{ marginBottom: 20 }}>
					<MenuItem key={"HealthCheck"} value={"HealthCheck"}>
						{"Health Check"}
					</MenuItem>
					<MenuItem key={"Hospital"} value={"Hospital"}>
						{"Hospital"}
					</MenuItem>
					<MenuItem key={"OccupationalHealthcare"} value={"OccupationalHealthcare"}>
						{"Occupational Healthcare"}
					</MenuItem>
				</Select>

				<InputLabel>Description</InputLabel>
				<TextField
					required
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>

				<InputLabel>Date</InputLabel>
				<TextField
					required
					fullWidth
					type="date"
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>

				<InputLabel>Specialist</InputLabel>
				<TextField
					required
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>

				<InputLabel id="multiple-chip-label">Diagnoses</InputLabel>
				<Select
					fullWidth
					multiple
					value={diagnosisCodes}
					onChange={onDiagnosisCodesChange}
					labelId="multiple-chip-label"
					id="multiple-chip"
					input={<OutlinedInput id="select-multiple-chip" />}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{diagnoses.map((d) => (
						<MenuItem key={d.code} value={d.code}>
							<code style={{ fontSize: 17 }}>{d.code}</code> {`\u00A0${d.name}`}
						</MenuItem>
					))}
				</Select>

				{type === "HealthCheck" && (
					<>
						<InputLabel>Health Check Rating</InputLabel>
						<Select required fullWidth value={healthCheckRating} onChange={onHealthCheckRatingChange}>
							<MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
							<MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
							<MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
							<MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
						</Select>
					</>
				)}

				{type === "Hospital" && (
					<>
						<InputLabel>Discharge Date</InputLabel>
						<TextField
							required
							fullWidth
							type="date"
							value={dischargeDate}
							onChange={({ target }) => setDischargeDate(target.value)}
						/>
						<InputLabel>Discharge Criteria</InputLabel>
						<TextField
							required
							fullWidth
							value={dischargeCriteria}
							onChange={({ target }) => setDischargeCriteria(target.value)}
						/>
					</>
				)}

				{type === "OccupationalHealthcare" && (
					<>
						<InputLabel>Employer Name</InputLabel>
						<TextField
							required
							fullWidth
							value={employerName}
							onChange={({ target }) => setEmployerName(target.value)}
						/>
						<InputLabel>Medical Leave Start Date</InputLabel>
						<TextField
							required={startLeave !== "" || endLeave !== ""}
							fullWidth
							type="date"
							value={startLeave}
							onChange={({ target }) => setStartLeave(target.value)}
						/>
						<InputLabel>Medical Leave End Date</InputLabel>
						<TextField
							required={startLeave !== "" || endLeave !== ""}
							fullWidth
							type="date"
							value={endLeave}
							onChange={({ target }) => setEndLeave(target.value)}
						/>
					</>
				)}

				<Grid>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							style={{ float: "left" }}
							type="button"
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: "right",
							}}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddDiagnosisForm;
