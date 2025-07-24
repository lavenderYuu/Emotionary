import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseButton from "./buttons/CloseButton";
import { Link } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px'
  },
};

// text adapted from: https://termly.io/html_document/website-privacy-policy-template-text-format/
const PrivacyPolicyModal = ({ show, hide }) => {
  return (
    <>
      <Modal
        open={show}
        onClose={hide}
      >
        <Box sx={style}>
          <Typography variant="h5">
            Privacy Policy
          </Typography>
          <CloseButton onClick={hide} />
          <p>
            <strong>Disclaimer:</strong> This is a mock privacy policy created for educational and demonstration purposes only.
            It is intended to illustrate what a real privacy policy might contain regarding data collection, usage, and storage. 
            This document is not legally binding and does not represent a real legal document.
          </p>
          <Typography variant= "h6" sx={{ mt: '16px'}}>Information we collect</Typography>
          <p>
            We collect personal information that you voluntarily provide to us:
          </p>
          <ul>
            <li>
              Login information: For regular users, we collect your first name, email address, and a password that you create.
              For users who sign in with Google, we collect your first name, Google email address, Google ID, and a passkey that you create.
            </li>
            <li>
              Journal entries: We collect the title, date, and content of each entry, as well as customized tags and mood indicators.
            </li>
          </ul>
          <Typography variant= "h6" sx={{ mt: '16px'}}>How we use your information</Typography>
          <p>
            We use your collected information to facilitate:
          </p>
          <ul>
            <li>
              Account creation and authentication
            </li>
            <li>
              Delivery of services
            </li>
          </ul>
          <Typography variant= "h6" sx={{ mt: '16px'}}>How we store your information</Typography>
          <p>
            Your privacy is important to us. We have implemented measures to protect your data:
          </p>
          <ul>
            <li>
              Secure storage: Your personal information and journal entries are securely stored on {" "}
              <Link href="https://www.mongodb.com/resources/products/capabilities/mongodb-atlas-security" underline="always" target="_blank" rel="noreferrer">MongoDB Atlas</Link>. 
            </li>
            <li>
              Encryption: Journal entry content is encrypted using a key derived from your password or passkey. 
              These keys are never stored on our servers. Your password or passkey is securely hashed and stored, and cannot be reversed.
            </li>
          </ul>
          <Typography variant= "h6" sx={{ mt: '16px'}}>Data sharing</Typography>
            <p>
              We do not share your information with third parties, except for sentiment analysis in which we
              send your journal entry contents to <Link href="https://huggingface.co/docs/inference-providers/en/security" underline="always" target="_blank" rel="noreferrer">Hugging Face</Link> {" "}
              (HF Inference). Hugging Face does not store any user data and does not store the request body or response when routing requests. 
              Routing uses TLS/SSL to encrypt data in transit.
            </p>
          <Typography variant= "h6" sx={{ mt: '16px'}}>Data retention</Typography>
          <p>We retain your information for as long as your account remains active.</p>
        </Box>
      </Modal>
    </>
  );
}

export default PrivacyPolicyModal;