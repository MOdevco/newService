import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { API } from '../api/api';
import axios from 'axios';

export default () => {
    const [data, setData] = useState([])
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
            .get(`${API}api/firm`, {
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


    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#10B981' : '#10B981',
          color: state.isSelected ? 'white' : 'white',
        }),
      };
    return (
        <Box width={'300px'}>
            <Select styles={customStyles} options={options.map((option, index) => ({
                value: index,
                label: option.value
            }))}>

            </Select>
        </Box>
    );
};
