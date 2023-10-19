import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { MdOutlineMoreVert } from 'react-icons/md'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import axios from 'axios'
import { API } from '../api/api'
function Status() {
    const handleClick = () => setopen(!open);
    const toast = useToast()
    const [open, setopen] = useState(false);
    const [status, setStatus] = useState({ name: "" })
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get(`${API}api/status`, {
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

    const handleStatus = () => {
        axios
            .post(`${API}api/status/new`, {
                name: status.name,
            }, {
                headers: {
                    // "ngrok-skip-browser-warning": true,
                    // "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            })
            .then((res) => {
                toast({
                    description: `Malumot saqlandi`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
                axios
                    .get(`${API}api/status`, {
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
                <Box display={"Flex"} alignItems={"center"} gap="10px" >
                    <Text fontSize={'20px'} fontWeight={'500'}>Status</Text>
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
                    <Box width={'25%'} display={"flex"} alignItems={"center"}>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} gap={'20px'}>
                            <FormControl isRequired>
                                <FormLabel>Nomi</FormLabel>
                                <Input onChange={(e) => setStatus({ ...status, name: e.target.value })} value={status.name} placeholder='Nomi..' />
                            </FormControl>

                            <Button
                                onClick={handleStatus}
                                mt={'30px'}
                                bg={"#4CAF50"}
                                color={"#fff"}
                                size="md"
                                borderRadius={"3px"}
                                _hover={"none"}
                                _active={"none"}
                                width={'200px'}
                            >
                                Qo’shish
                            </Button>
                        </Box>


                    </Box>
                )}


            </Box>
            <TableContainer shadow={"0px 2px 8px 0px rgba(0, 0, 0, 0.12)"} mt={'20px'}>
                <Table width={"100%"} rounded={"16px"} fontSize={'15pxpx'}>
                    <Thead>
                        <Tr bg="#F1F3F9" >
                            <Th w={'25px'} fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>№</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Status</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {data.map((item, i) => (
                            <Tr key={i} bg={i % 2 == 1 ? "#F8F9FC" : ""}>
                                <Td>
                                    {i + 1}
                                </Td>
                                <Td>
                                    {item.name}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Status