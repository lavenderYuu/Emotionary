import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export function getPasskeyRequirements(passkey) {
  return {
    length: passkey.length >= 12,
    uppercase: /[A-Z]/.test(passkey),
    number: /\d/.test(passkey),
    symbol: /[^A-Za-z0-9]/.test(passkey),
  };
}

export default function PasskeyRequirements({ requirements, isPasskey = true }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {isPasskey ? "Your passkey must contain:" : "Your password must contain:"}
      </Typography>
      <Requirement label="At least 12 characters" isMet={requirements.length} />
      <Requirement label="An uppercase letter" isMet={requirements.uppercase} />
      <Requirement label="A number" isMet={requirements.number} />
      <Requirement label="A symbol" isMet={requirements.symbol} />
    </Box>
  );
}

function Requirement({ label, isMet }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      color: isMet ? 'green' : 'gray',
      mb: 0.5 }}
    >
      {isMet ? <CheckIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
      <Typography variant="body2" sx={{ ml: 1 }}>{label}</Typography>
    </Box>
  );
}