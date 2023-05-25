import { Entry } from "../../types";
import { assertNever } from "../../utils";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	switch (entry.type) {
		case "Hospital":
			return (
				<p>
					{entry.discharge.date}: Discharged - {entry.discharge.criteria}
				</p>
			);
		case "OccupationalHealthcare":
			return (
				<>
					<p>employer: {entry.employerName}</p>
					{entry.sickLeave && (
						<p>
							{entry.sickLeave.startDate} - {entry.sickLeave.endDate}: Medical leave
						</p>
					)}
				</>
			);
		case "HealthCheck":
			return (
				<>
					{entry.healthCheckRating === 3 ? (
						<>
							<StarBorderIcon />
							<StarBorderIcon />
							<StarBorderIcon />
						</>
					) : entry.healthCheckRating === 2 ? (
						<>
							<StarIcon />
							<StarBorderIcon />
							<StarBorderIcon />
						</>
					) : entry.healthCheckRating === 1 ? (
						<>
							<StarIcon />
							<StarIcon />
							<StarBorderIcon />
						</>
					) : (
						<>
							<StarIcon />
							<StarIcon />
							<StarIcon />
						</>
					)}
				</>
			);
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
