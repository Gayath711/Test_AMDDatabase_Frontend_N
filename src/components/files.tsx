import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import '../App.css';

export default function InteractiveList(props: any) {

    const downloadFile = (name: any) => {

        fetch('/api/files/' + name)
            .then((data) => {
            })
            .catch((err) => {
                console.log(err.message);
            });
    }



    const handleFileChange = (name: String) => {
        if (!name) {
            return;
        }
        downloadFile(name);
    };

    if (props.uploadedfile !== undefined)
        props.files.push(props.uploadedfile)

    return (
        <div>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#ebbf61' }}>
                {
                    props.files.map((val: any, index: number) => {

                        return (

                            <ListItem alignItems="flex-start" key={index} value={val.name} divider >
                                <ListItemAvatar >
                                    <PictureAsPdfOutlinedIcon sx={{ color: '#282c34' }} />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{ color: "#282c34" }}
                                    primary={val.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                            >
                                            </Typography>
                                        </React.Fragment>

                                    }

                                />
                                <IconButton
                                    component="label"
                                    sx={{ color: "#282c34" }}
                                    onClick={() => handleFileChange(val.name)}
                                >
                                    <FileDownloadOutlinedIcon sx={{ display: 'inline' }} />

                                </IconButton>
                            </ListItem>)
                    })}

                <Divider />
            </List>
        </div>


    )
}







