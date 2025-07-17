import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MentalHealthIndicator() {
    const entries = useSelector((state) => state.entries.entries);
    const userName = useSelector((state) => state.auth.userName);
    const [open, setOpen ] = useState(false);
    const [hasAcknowledged, setHasAcknowledged] = useState(false);
    const [acknowlegementLoaded, setAcknowledgementLoaded] = useState(false);

    useEffect(() => { // use local storage to see if user has acknowledged MHI resources
        const acknowledged = localStorage.getItem('MHIAcknowledged');
        if (acknowledged === 'true') {
            setHasAcknowledged(true);
        }
        setAcknowledgementLoaded(true);
    }, []);

    useEffect(() => {
        if (!acknowlegementLoaded || !entries.length) {
            // setOpen(false);
            return;
        }

        const oneWeekAgo = dayjs().subtract(7, 'day').startOf('day');
        const pastWeekEntries = entries.filter(entry => {
            const date = dayjs(entry.date);
            return date.isAfter(oneWeekAgo) && (entry.mood === "😭" || entry.mood === "☹️");
        });

        if (pastWeekEntries.length >= 5 && !hasAcknowledged) {
            setOpen(true);
        }
    }, [entries, acknowlegementLoaded]);

    const handleAcknowledge = () => {
        localStorage.setItem('MHIAcknowledged', 'true');
        setHasAcknowledged(true);
        // setOpen(false);
    };

    const handleClose = () => {
        console.log('hasAcknowledged', hasAcknowledged);
        if (!hasAcknowledged) return;
        
        localStorage.setItem('MHIAcknowledged', 'true');
        setOpen(false);
    }

    return (
        <Dialog sx={{ zIndex: 10001 }} open={open} onClose={() => {}} disableEscapeKeyDown slotProps={{ paper: { sx: { borderRadius: 4, minWidth: 400 }}}}>
            <DialogTitle>We are here for you, {userName} ❤️</DialogTitle>
            <DialogContent>
                <Typography variant="body1">We noticed you've been feeling down lately. It's important to get help if you or someone you know needs support for mental health, addiction or wellbeing.</Typography>
                <Typography variant="body2"></Typography>
                {/* <ul style={{ paddingLeft: '20px' }}>
                    <li>
                        <a href="https://www.crisisservicescanada.ca/en/" target="_blank" rel="noopener noreferrer">
                        Crisis Services Canada – 1-833-456-4566
                        </a>
                    </li>
                </ul> */}
                <h3>If you or someone you know is in crisis</h3>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                    <li>If you're in immediate danger or need urgent medical support, call <strong>9-1-1</strong>.</li>
                    <li>If you or someone you know is thinking about suicide, call or text <strong>9-8-8</strong>. Support is available 24 hours a day, 7 days a week.</li>
                    {/* <li>If you're experiencing family or gender-based violence, you can access a crisis line in your province or territory.</li> */}
                    <li>If you're experiencing family or gender-based violence, you can <a href="https://www.canada.ca/en/public-health/services/health-promotion/stop-family-violence/services.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                        access a crisis line
                        </a>{' '} in your province or territory.</li>
                </ul>
                {/* <Typography variant="body1" sx={{mb: 1}}>If you're in immediate danger or need urgent medical support, call 9-1-1.</Typography>
                <Typography variant="body1" sx={{mb: 1}}>If you or someone you know is thinking about suicide, call or text 9-8-8. Support is available 24 hours a day, 7 days a week.</Typography>
                <Typography variant="body1" sx={{mb: 1}}>If you're experiencing family or gender-based violence, you can access a crisis line in your province or territory.</Typography> */}
                <h3>Provincial and territorial resources</h3>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Alberta</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            211 Alberta
                        </Typography>
                        <Typography variant="body2">
                            Call <strong>2-1-1</strong> or text <strong>INFO</strong> to <strong>2-1-1</strong>.
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li>Available 24 hours a day, 7 days a week</li>
                            <li>Crisis support and virtual services</li>
                            <li>Connect to local mental health and addiction services</li>
                        </ul>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Counselling Alberta
                        </Typography>
                        <Typography variant="body2">
                            Call <strong>1-833-827-4230</strong> (toll-free).
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.counsellingalberta.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Affordable counselling
                                </a>{' '} with same-day appointments</li>
                            <li>Virtual counselling services province-wide</li>
                            <li>In-person counselling options</li>
                        </ul>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Alberta Mental Health Line
                        </Typography>
                        <Typography variant="body2">
                            Call <strong>1-877-303-2642</strong> (toll-free).
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li>Available 24 hours a day, 7 days a week</li>
                            <li>Confidential support, information and referrals</li>
                            <li>Staffed by mental health professionals</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">British Columbia</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Ministry of Health: Help Starts Here
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://helpstartshere.gov.bc.ca/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Navigation tool
                                </a>{' '} to find mental health and substance use resources and services</li>
                            <li>Information and articles on well-being, mental health, and substance use</li>
                            <li>Website in English with translation available in over 100 languages</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Manitoba</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Manitoba: Mental Health and Addictions
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.gov.mb.ca/mhcw/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provincial website
                                </a>{' '} with information on mental health and addictions supports and services</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">New Brunswick</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of New Brunswick: Addictions and Mental Health
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.gnb.ca/en/topic/health-wellness/mental-health.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provincial website
                                </a>{' '} with information on mental health and addictions supports and services</li>
                            <li>Available in English and French</li>
                        </ul>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Bridge the gapp New Brunswick
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://nb.bridgethegapp.ca/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Online mental health and addictions information
                                </a>, tools, programs, and service directory</li>
                            <li>For youth and adults</li>
                            <li>Available in English and French</li>
                        </ul>
                        <Typography variant="subtitle1" fontWeight="bold">
                            211 New Brunswick
                        </Typography>
                         <Typography variant="body2">
                            Dial <strong>8-1-1</strong>, or call <strong>1-855-258-4126</strong> (toll-free).
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li>Available 24 hours a day, 7 days a week</li>
                            <li>Online chat available Monday to Friday, 8 am to 10 pm</li>
                            <li><a href="https://nb.211.ca/search/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Information and referrals
                                </a>{' '} for social, community and government supports and services</li>
                            <li>Searchable online database</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Newfoundland and Labrador</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Newfoundland and Labrador: Mental Health and Addictions
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.gov.nl.ca/hcs/mentalhealth-committee/mentalhealth/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provincial website
                                </a>{' '} with information on mental health and addictions supports and services</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Northwest Territories</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Northwest Territories: Mental Wellness and Addictions Recovery
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.hss.gov.nt.ca/en/services/mental-wellness-and-addictions-recovery" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Territorial website
                                </a>{' '} with information on mental health supports and services</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Nova Scotia</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Nova Scotia Health Authority: Mental Health and Wellbeing
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://novascotia.ca/mental-health-and-wellbeing/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provicinal website
                                </a>{' '} with information on supports and services for mental health, addiction and well-being</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Nunavut</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Nunavut: Mental Health Resources
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.gov.nu.ca/en/health/mental-health-resources?msclkid=e1531244bd9311ec9dd9e9ec7bb8b80b" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Territorial website
                                </a>{' '} with information on mental health resources and services</li>
                            <li>Available in English, French and Inuktitut</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Ontario</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Ontario: Find Mental Health Support
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.ontario.ca/page/find-mental-health-support" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provincial website
                                </a>{' '} with information about supports and services and how to find help</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Prince Edward Island</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Prince Edward Island: Mental Health and Addictions Services
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.princeedwardisland.ca/en/information/health-pei/mental-health-support-and-services" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provincial website
                                </a>{' '} with information on mental health supports and services</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Quebec</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Quebec: Mental Health
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.quebec.ca/en/health/mental-health" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provincial website
                                </a>{' '} with information on mental health and how to find support</li>
                            <li>Available in English and French</li>
                        </ul>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Info-Social 811
                        </Typography>
                         <Typography variant="body2">
                            Call <strong>8-1-1</strong>.
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li>Available 24 hours a day, 7 days a week</li>
                            <li><a href="https://www.quebec.ca/en/health/finding-a-resource/info-social-811" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Free confidential telephone consultation service
                                </a>{' '}for Quebec residents to connect with a psychosocial worker quickly</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Saskatchewan</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Saskatchewan: Mental Health Services
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li><a href="https://www.saskatchewan.ca/residents/health/accessing-health-care-services/mental-health-and-addictions-support-services/mental-health-support/mental-health-services" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Provincial website
                                </a>{' '} with information on mental health resources and services</li>
                            <li>Web content in English and French with translation available in over 100 languages</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    >
                    <Typography component="span">Yukon</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Government of Yukon: Mental Wellness and Substance Use Services
                        </Typography>
                        <Typography variant="body2">
                            Call <strong>867-456-3838</strong> or <strong>1-866-456-3838</strong> (toll-free).
                        </Typography>
                        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                            <li>Phone line available Monday to Friday from 8:30 am to 4:30 pm</li>
                            <li>For after-hours withdrawal management services, call 867-667-8473</li>
                            <li><a href="https://yukon.ca/en/places/mental-wellness-and-substance-use-services" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                Territorial website
                                </a>{' '} with information on mental health and substance use supports and services</li>
                            <li>Available in English and French</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>

                {/* <h3>Services offered by national mental health organizations</h3>
                <ul>
                    <li>Canadian Mental Health Association (CMHA)</li>
                    <li>Centre for Addiction and Mental Health (CAMH)</li>
                </ul> */}

                <h3>More ways to get help</h3>
                <Typography>If you need help, you can call a:</Typography>
                <ul>
                    <li>family physician</li>
                    <li>psychologist</li>
                    <li>mental health nurse</li>
                    <li>social worker</li>
                </ul>
                <Typography>You may also want to talk to another trusted professional, such as a counsellor or spiritual leader.</Typography>
            </DialogContent>
            <DialogActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                {/* <Button variant='contained' onClick={handleAcknowledge}>
                    I've read this.
                </Button> */}
                
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}> */}
                    <FormControlLabel required control={<Checkbox checked={hasAcknowledged} onChange={(e) => setHasAcknowledged(e.target.checked)} />} label="I have read and reviewed this." />
                    {/* <Checkbox
                    checked={hasAcknowledged} 
                    onChange={handleAcknowledge} 
                    required
                    sx={{ p: 0, paddingRight: '8px' }}
                    />
                    <Typography variant="body2">
                    I have read and reviewed this.
                    </Typography> */}
                {/* </Box> */}
                <Button
                    onClick={handleClose}
                    disabled={!hasAcknowledged}
                    >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}