import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InteractiveList from './files'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import '../App.css';

export default function CustomizedInputBase() {

    const [selectedFile, setSelectedFile] = React.useState<any>();
    const [filesData, setFiles] = React.useState<any[]>([])

    /*React.useEffect(() => {
        fetch('/api/files')
            .then((response) => response.json())
            .then((data) => {
                setFiles(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);*/


    const addPosts = async (uploadedfile: File) => {

        const formData: FormData = new FormData();
        formData.append('file', uploadedfile);
        fetch('/docreader/upload/', {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
            .then((response) => response)
            .then((data) => {
                setSelectedFile(uploadedfile);
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });

    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        addPosts(e.target.files[0]);
    };

    return (
        <div className='App-header'>
            <Paper >
                <IconButton
                    component="label"
                >
                    <FileUploadOutlinedIcon />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        hidden
                    />
                </IconButton>
                <InputBase
                    placeholder="Upload a File"
                    inputProps={{ 'aria-label': 'Upload a File' }}
                />
            </Paper>
            <Divider />
            <InteractiveList files={filesData} uploadedfile={selectedFile}></InteractiveList>
        </div>

    );
}





