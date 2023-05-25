import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";

import AddDiagnosisForm from "./AddDiagnosisForm";
import { Diagnosis, EntryWithoutId } from "../../types";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: EntryWithoutId) => void;
	error?: string;
	diagnoses: Diagnosis[];
}

const AddDiagnosisModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => (
	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Add a new entry</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity="error">{error}</Alert>}
			<AddDiagnosisForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
		</DialogContent>
	</Dialog>
);

export default AddDiagnosisModal;
