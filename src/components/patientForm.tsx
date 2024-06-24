import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, CircularProgress, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';

const PatientForm = () => {
    const [billNumber, setBillNumber] = React.useState('');
    const [patientName, setPatientName] = React.useState('');
    const [billDetails, setBillDetails] = React.useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('/api/getPatientInfo', {
                params: {
                    billNumber: billNumber,
                    patientName: patientName,
                },
            });
            setBillDetails(response.data);
            console.log(billDetails);
        } catch (error) {
            setError('Error fetching bill details. Please try again.');
            console.error('Error fetching bill details:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Bill Details
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            label="Bill Number"
                            variant="outlined"
                            fullWidth
                            value={billNumber}
                            onChange={(e) => setBillNumber(e.target.value)}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            label="Patient Name"
                            variant="outlined"
                            fullWidth
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                        />
                    </Grid>*/}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!billNumber || loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Details'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && (
                <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                    {error}
                </Typography>
            )}
            {billDetails && (
                <Card style={{ marginTop: '20px' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Patient Details Result
                        </Typography>
                        <Divider style={{ marginBottom: '10px' }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1">{billDetails}</Typography>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Paper>
    );
};

export default PatientForm;
