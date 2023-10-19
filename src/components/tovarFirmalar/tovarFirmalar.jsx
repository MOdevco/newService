import React, { useEffect, useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Input,
    Box,
    Text,
} from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { MdOutlineMoreVert } from 'react-icons/md'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { API } from '../api/api';
const TovarFirmalar = () => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const d = new Date();
    let name = monthNames[d.getMonth()];
    const [data1, setData1] = useState([]);
    const [open, setopen] = useState(false);
    const handleClick = () => setopen(!open);
    const [data, setData] = useState([])
    const [dataVal, setDataVal] = useState({ address: '', name: ''})
    const toast = useToast()
   
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
                setData(res.data);
            });
    }, []);

    const handleSubmit = () => {
        axios
            .post(`${API}api/firm/new`, {
                "name": dataVal.name,
                "address": dataVal.address,
                "email": dataVal.email,
                "tel": dataVal.tel,
                "web": dataVal.web
            }, {
                headers: {
                    // "ngrok-skip-browser-warning": true,
                    // "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            })
            .then((res) => {
                setDataVal({ address: '', email: '', name: '', tel: '', web: "" })
                console.log(res.data);
                toast({
                    description: `Malumot saqlandi`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
                axios
                    .get(`${API}api/firm`, {
                        headers: {
                            // "ngrok-skip-browser-warning": true,
                            // "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((res) => {
                        setData(res.data);
                    });
            })
            .catch((err) => {
                toast({
                    description: `${err.response.data.message}`,
                    status: 'error',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
            });
    }

    return (
        <Box>
            <Box>
                <Box>
                    <Box display={"Flex"} alignItems={"center"} gap="10px" >
                        <Text fontSize={'20px'} fontWeight={'500'}>Tovar kategoriyalari</Text>
                        <Button

                            bg={"transparent"}
                            _hover={""}
                            _active={""}
                            onClick={handleClick}
                        >
                            {open ? (
                                <AiFillMinusCircle color="#B10202" />
                            ) : (
                                <AiFillPlusCircle color="#4CAF50" />
                            )}
                        </Button>
                    </Box>
                    {open && (
                        <Box width={'50%'} display={"flex"} alignItems={"center"}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} gap={'20px'}>
                                <FormControl isRequired>
                                    <FormLabel>Nomi</FormLabel>
                                    <Input onChange={(e) => setDataVal({ ...dataVal, name: e.target.value })} value={dataVal.name} placeholder='Nomi..' />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Address</FormLabel>
                                    <Input onChange={(e) => setDataVal({ ...dataVal, address: e.target.value })} value={dataVal.address}  placeholder='Address..' />
                                </FormControl>

                               
                                <Button
                                    onClick={handleSubmit}
                                    mt={'30px'}
                                    bg={"#4CAF50"}
                                    color={"#fff"}
                                    size="md"
                                    borderRadius={"3px"}
                                    _hover={"none"}
                                    _active={"none"}
                                    width={'400px'}
                                >
                                    Qo’shish
                                </Button>
                            </Box>


                        </Box>
                    )}


                </Box>
            </Box>

            <TableContainer w={'75%'} shadow={"0px 2px 8px 0px rgba(0, 0, 0, 0.12)"} mt={'20px'}>
                <Table  rounded={"16px"} fontSize={'19px'}>
                    <Thead w={'100%'}>
                        <Tr bg="#F1F3F9" w={'100%'}>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'17px'}>№</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'17px'}> Nomi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'17px'}>Address</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, i) => (
                            <Tr key={i} bg={i % 2 == 1 ? '#F8F9FC' : ''}>
                                <Td>{i + 1}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.address}</Td>
                                <Td><MdOutlineMoreVert size={"29px"} /></Td>
                                
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TovarFirmalar