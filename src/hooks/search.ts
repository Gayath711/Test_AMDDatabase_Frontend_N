
import React, { useState, useEffect } from 'react';

const app_search = () => {
    const [body, setBody] = useState('');

    const addPosts = async (body: any) => {
        await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify({
                file: body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBody('');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

}
export default app_search;
