import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { API } from '../api/api';
import axios from 'axios';

export default ({data}) => {
   
    return (
        <Box width={'300px'}>
            <Select options={data.map((option, index) => ({
                value: index,
                label: `${option.name} ${option.address}`
            }))}>

            </Select>
        </Box>
    );
};
