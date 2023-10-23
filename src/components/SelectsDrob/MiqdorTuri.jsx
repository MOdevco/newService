import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { API } from '../api/api';
import axios from 'axios';

export default ({data}) => {
    let all = []
    data.map((item) => (
        all.push(item.name)
    ))
    

    const options = [];

    for (let i = 0; i < all.length; i++) {
        var obj = {};

        obj['value'] = all[i];
        options.push(obj);
    }



    useEffect(() => {
        axios
            .get(`${API}api/unit`, {
                headers: {
                    // "ngrok-skip-browser-warning": true,
                    // "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setData(res.data)
            
            });
    }, []);


   
      
    return (
        <Box width={'300px'}>
            <Select options={options.map((option, index) => ({
                value: index,
                label: option.value
            }))}>

            </Select>
        </Box>
    );
};
