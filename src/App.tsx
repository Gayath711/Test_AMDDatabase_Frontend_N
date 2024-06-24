import * as React from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Search from './components/search';
import Upload from './components/upload';
import PatientForm from './components/patientForm';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: "89vh",
}));

const Item_head = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: "3vh",
}));

export default function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} direction="row" justifyContent="space-evenly" >
        <Grid item xs={12}>
          <Item_head></Item_head>
        </Grid>
        <Grid item xs={12} >
          <Item className='App-header'>
            {/* <Upload />*/}
            <PatientForm />
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

