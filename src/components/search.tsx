import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Content from './content'
import axios from 'axios';


export default function CustomizedInputBase() {
    const [query, setQuery] = React.useState({
        txt: "",
        namespace: ""
    });
    const [body, setBody] = React.useState('');


    const search = (val: any) => {
        if (!val) {
            return;
        }
        const article = { txt: val, namespace: "DocSearch" }

        axios.post('/api/sendQuery', val)
            .then(response => setBody(response.data));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) {
            return;
        }
        var queryString = {
            txt: e.target.value,
            namespace: "DocSearch"
        }
        setQuery(queryString)
    };

    return (
        <div>
            <Paper
                component="form"
                sx={{ display: 'flex' }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                </IconButton>
                <IconButton
                    component="label"
                >

                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Write Your Query"
                    inputProps={{ 'aria-label': 'Write Your Query' }}
                    onChange={handleFileChange}
                />
                <IconButton type="button" aria-label="search" onClick={() => search(query)}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Content answer={body} query={query.txt} />
        </div>
    );
}


