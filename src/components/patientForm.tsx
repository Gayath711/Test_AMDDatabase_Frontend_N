import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

// Define an interface for the expected data structure
interface MyData {
    'Name': String
    'Address': String,
    'City': String,
    'State': String,
    'Country': String,
    'PhoneNumber': String,
    'DOB': String,
    'Email': String,
    'Gender': String,
    'Notes': String,
    'NoteType': String,
    'AdmissionTypecode': String,
    'AdmittingDiagnosisTypeCode': String,
    'PatientStatusCode': string,
    'AdmissionDate': string
}

const DataFetchingComponent: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        dob: '',
    });

    const [responseData, setResponseData] = useState<MyData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get<MyData[]>('/api/dataFromMSSQL', {
                params: {
                    name: formData.name,
                    phone: formData.phone,
                    dob: formData.dob,
                },
            });
            setResponseData(response.data);
            console.log(response.data)
            console.log(responseData)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" >
            <Typography variant="h4" align="center" gutterBottom>
                Enter Patient Details
            </Typography>
            <form onSubmit={handleSubmit}>

                <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    variant="outlined"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    style={{ marginBottom: '20px' }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ marginBottom: '20px' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
            </form>

            {loading && <Typography variant="body1">Loading...</Typography>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}

            {responseData.length > 0 && (
                <div >
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Gender</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {responseData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.Name}</TableCell>
                                        <TableCell>{row.PhoneNumber}</TableCell>
                                        <TableCell>{row.DOB}</TableCell>
                                        <TableCell>{row.Address}</TableCell>
                                        <TableCell>{row.City}</TableCell>
                                        <TableCell>{row.State}</TableCell>

                                        <TableCell>{row.Country}</TableCell>
                                        <TableCell>{row.Gender}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Communication Notes</TableCell>
                                    <TableCell>NoteType</TableCell>
                                    <TableCell>Admission Date</TableCell>
                                    <TableCell>Admission Type</TableCell>
                                    <TableCell>Diagnosis Type Code</TableCell>
                                    <TableCell>Patient Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {responseData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.Notes}</TableCell>
                                        <TableCell>{row.NoteType = "ALG " ? "Allergies" :
                                            row.NoteType = "DCP " ? "Goals, Rehabilitation Potential, or Discharge Plans" :
                                                row.NoteType = "DGN " ? "Diagnosis Description" :
                                                    row.NoteType = "DME " ? "Durable Medical Equipment (DME) and Supplies" :
                                                        row.NoteType = "MED " ? "Medications" :
                                                            row.NoteType = "NTR " ? "Nutritional Requirements" :
                                                                row.NoteType = "ODT " ? "Orders for Disciplines and Treatments" :
                                                                    row.NoteType = "RHB " ? "Functional Limitations, Reason Homebound, or Both" :
                                                                        row.NoteType = "RLH " ? "Reasons Patient Leaves Home" :
                                                                            row.NoteType = "RNH " ? "Times and Reasons Patient Not at Home" :
                                                                                row.NoteType = "SET " ? "Unusual Home, Social Environment, or Both" :
                                                                                    row.NoteType = "SFM " ? "Safety Measures" :
                                                                                        row.NoteType = "SPT " ? "Supplementary Plan of Treatment" :
                                                                                            "Updated Information"}</TableCell>
                                        <TableCell>{row.AdmissionDate}</TableCell>
                                        <TableCell>{row.AdmissionTypecode = "1" ? "Emergency" : row.AdmissionTypecode = "2" ? "Urgent" : row.AdmissionTypecode = "3" ? "Elective" : "New born"}</TableCell>
                                        <TableCell>{row.AdmittingDiagnosisTypeCode = "BJ" ? "Admitting" : "Unscheduled Outpatient Visit"}</TableCell>
                                        <TableCell>{
                                            row.PatientStatusCode = "01" ?
                                                "Discharged - Home or Self Care" :
                                                row.PatientStatusCode = "02" ?
                                                    "Discharge/Transfer - Hospital " :
                                                    row.PatientStatusCode = "03" ?
                                                        "Discharge/Transfer - SNF " :
                                                        row.PatientStatusCode = "04" ?
                                                            "Discharge/Transfer - ICF " :
                                                            row.PatientStatusCode = "05" ?
                                                                "Discharge/Transfer - Institute" :
                                                                row.PatientStatusCode = "06" ?
                                                                    "Discharge/Transfer - HH Org" :
                                                                    row.PatientStatusCode = "07" ?
                                                                        "Left/Discontinued - Care" :
                                                                        row.PatientStatusCode = "08" ?
                                                                            "Discharge/Transfer - Home IV" :
                                                                            row.PatientStatusCode = "09" ?
                                                                                "Admitted as Inpatient" :
                                                                                row.PatientStatusCode = "20" ?
                                                                                    "Expired" :
                                                                                    row.PatientStatusCode = "30" ?
                                                                                        "Still Patient" :
                                                                                        row.PatientStatusCode = "40" ?
                                                                                            "Expired at Home" :
                                                                                            row.PatientStatusCode = "41" ?
                                                                                                "Expired in Medical Facility" :
                                                                                                row.PatientStatusCode = "42" ?
                                                                                                    "Expired - Place Unknown" :
                                                                                                    row.PatientStatusCode = "50" ?
                                                                                                        "Hospice - Home" :
                                                                                                        row.PatientStatusCode = " 51" ?
                                                                                                            "Hospice - Medical Facility" :
                                                                                                            row.PatientStatusCode = "61" ?
                                                                                                                "Discharge/Transfer - Swing Bed" :
                                                                                                                row.PatientStatusCode = "62" ?
                                                                                                                    "Discharge/Transfer - To Rehab" :
                                                                                                                    row.PatientStatusCode = "63" ?
                                                                                                                        "Discharge/Transfer - Term Care" :
                                                                                                                        row.PatientStatusCode = "71" ?
                                                                                                                            "Discharge/Transfer - Other Ins" :
                                                                                                                            "Discharge/Transfer - This Ins"}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </Container>
    );
};

export default DataFetchingComponent;
