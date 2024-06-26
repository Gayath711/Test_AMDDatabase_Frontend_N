import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@material-ui/core';

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
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Typography variant="h5" gutterBottom>
                            Patient Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Patient Name:</strong> {responseData[0].Name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Date of Birth:</strong> {responseData[0].DOB}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Gender:</strong> {responseData[0].Gender == "M" ? "Male" : "Female"}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1"><strong>Notes:</strong> {responseData[0].Notes}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1"><strong>Admission Type:</strong> {responseData[0].AdmissionTypecode == "1" ? "Emergency" : responseData[0].AdmissionTypecode == "2" ? "Urgent" : responseData[0].AdmissionTypecode == "3" ? "Elective" : "New born"}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1"><strong>Diagnosis Type:</strong> {responseData[0].AdmittingDiagnosisTypeCode == "BJ" ? "Admitting" : "Unscheduled Outpatient Visit"}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1"><strong>Note Type:</strong> {responseData[0].NoteType == "ALG" ? "Allergies" :
                                    responseData[0].NoteType == "DCP" ? "Goals, Rehabilitation Potential, or Discharge Plans" :
                                        responseData[0].NoteType == "DGN" ? "Diagnosis Description" :
                                            responseData[0].NoteType == "DME" ? "Durable Medical Equipment (DME) and Supplies" :
                                                responseData[0].NoteType == "MED" ? "Medications" :
                                                    responseData[0].NoteType == "NTR" ? "Nutritional Requirements" :
                                                        responseData[0].NoteType == "ODT" ? "Orders for Disciplines and Treatments" :
                                                            responseData[0].NoteType == "RHB" ? "Functional Limitations, Reason Homebound, or Both" :
                                                                responseData[0].NoteType == "RLH" ? "Reasons Patient Leaves Home" :
                                                                    responseData[0].NoteType == "RNH" ? "Times and Reasons Patient Not at Home" :
                                                                        responseData[0].NoteType == "SET" ? "Unusual Home, Social Environment, or Both" :
                                                                            responseData[0].NoteType == "SFM" ? "Safety Measures" :
                                                                                responseData[0].NoteType == "SPT" ? "Supplementary Plan of Treatment" :
                                                                                    "Updated Information"}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1"><strong>Patient Status:</strong> {responseData[0].PatientStatusCode == "01" ?
                                    "Discharged - Home or Self Care" :
                                    responseData[0].PatientStatusCode == "02" ?
                                        "Discharge/Transfer - Hospital " :
                                        responseData[0].PatientStatusCode == "03" ?
                                            "Discharge/Transfer - SNF " :
                                            responseData[0].PatientStatusCode == "04" ?
                                                "Discharge/Transfer - ICF " :
                                                responseData[0].PatientStatusCode == "05" ?
                                                    "Discharge/Transfer - Institute" :
                                                    responseData[0].PatientStatusCode == "06" ?
                                                        "Discharge/Transfer - HH Org" :
                                                        responseData[0].PatientStatusCode == "07" ?
                                                            "Left/Discontinued - Care" :
                                                            responseData[0].PatientStatusCode == "08" ?
                                                                "Discharge/Transfer - Home IV" :
                                                                responseData[0].PatientStatusCode == "09" ?
                                                                    "Admitted as Inpatient" :
                                                                    responseData[0].PatientStatusCode == "20" ?
                                                                        "Expired" :
                                                                        responseData[0].PatientStatusCode == "30" ?
                                                                            "Still Patient" :
                                                                            responseData[0].PatientStatusCode == "40" ?
                                                                                "Expired at Home" :
                                                                                responseData[0].PatientStatusCode == "41" ?
                                                                                    "Expired in Medical Facility" :
                                                                                    responseData[0].PatientStatusCode == "42" ?
                                                                                        "Expired - Place Unknown" :
                                                                                        responseData[0].PatientStatusCode == "50" ?
                                                                                            "Hospice - Home" :
                                                                                            responseData[0].PatientStatusCode == " 51" ?
                                                                                                "Hospice - Medical Facility" :
                                                                                                responseData[0].PatientStatusCode == "61" ?
                                                                                                    "Discharge/Transfer - Swing Bed" :
                                                                                                    responseData[0].PatientStatusCode == "62" ?
                                                                                                        "Discharge/Transfer - To Rehab" :
                                                                                                        responseData[0].PatientStatusCode == "63" ?
                                                                                                            "Discharge/Transfer - Term Care" :
                                                                                                            responseData[0].PatientStatusCode == "71" ?
                                                                                                                "Discharge/Transfer - Other Ins" :
                                                                                                                "Discharge/Transfer - This Ins"}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            )}
        </Container>
    );
};

export default DataFetchingComponent;
