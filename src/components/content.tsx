import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AlignItemsList(props: any) {
    return (
        <div>
            <List >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.answer.message !== undefined ? props.query : ""}
                        sx={{ color: "#FFFFFF" }}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                </Typography>
                                <Divider sx={{ height: 20 }} />
                                <textarea name="postContent" value={props.answer.message} disabled={true} rows={30} cols={125} style={{ background: "#FFFFFF" }} />
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
}


