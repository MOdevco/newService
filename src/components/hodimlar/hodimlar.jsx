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
import { API } from '../../api';
import { useToast } from '@chakra-ui/react'
const Hodimlar = () => {
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
    const [dataVal, setDataVal] = useState({ address: '', email: '', name: '', tel: '', web: "" })
    const toast = useToast()
   
    // useEffect(() => {
    //     axios
    //         .get(`${API}api/firm`, {
    //             headers: {
    //                 // "ngrok-skip-browser-warning": true,
    //                 // "Access-Control-Allow-Origin": "*",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         })
    //         .then((res) => {
    //             setData(res.data);
    //         });
    // }, []);

    // const handleSubmit = () => {
    //     axios
    //         .post(`${API}api/firm/new`, {
    //             "name": dataVal.name,
    //             "address": dataVal.address,
    //             "email": dataVal.email,
    //             "tel": dataVal.tel,
    //             "web": dataVal.web
    //         }, {
    //             headers: {
    //                 // "ngrok-skip-browser-warning": true,
    //                 // "Access-Control-Allow-Origin": "*",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },

    //         })
    //         .then((res) => {
    //             setDataVal({ address: '', email: '', name: '', tel: '', web: "" })
    //             console.log(res.data);
    //             toast({
    //                 description: `Malumot saqlandi`,
    //                 status: 'success',
    //                 position: 'top-right',
    //                 duration: 2000,
    //                 isClosable: true,
    //             })
    //             axios
    //                 .get(`${API}api/firm`, {
    //                     headers: {
    //                         // "ngrok-skip-browser-warning": true,
    //                         // "Access-Control-Allow-Origin": "*",
    //                         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                     },
    //                 })
    //                 .then((res) => {
    //                     setData(res.data);
    //                 });
    //         })
    //         .catch((err) => {
    //             toast({
    //                 description: `${err.response.data.message}`,
    //                 status: 'error',
    //                 position: 'top-right',
    //                 duration: 2000,
    //                 isClosable: true,
    //             })
    //         });
    // }


    return (
        <Box>
            <Box>
                <Box>
                    <Box display={"Flex"} alignItems={"center"} width={'100%'} gap="10px" >
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
                        <Box width={'100%'} display={"flex"} alignItems={"center"}>
                            <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} gap={'20px'}>
                                <Box display={'flex'} gap={'10px'}>
                                    <FormControl isRequired>
                                        <FormLabel>Ismi</FormLabel>
                                        <Input width={'300px'}  placeholder='Ismi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Familiyasi</FormLabel>
                                        <Input width={'300px'} placeholder='Familiyasi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Sharfi</FormLabel>
                                        <Input width={'300px'} type='number' placeholder='Sharfi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Passport</FormLabel>
                                        <Input width={'300px'}  placeholder='Passport..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Asosiy telefon</FormLabel>
                                        <Input width={'300px'}  placeholder='Asosiy telefon..' />
                                    </FormControl>
                                </Box>

                                <Box  display={'flex'}gap={'10px'}>
                                    <FormControl isRequired>
                                        <FormLabel>Qo’shimcha telefon</FormLabel>
                                        <Input width={'300px'}  placeholder='Qo’shimcha telefon..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>QLavozimi</FormLabel>
                                        <Input width={'300px'}  placeholder='Lavozimi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Ish boshlash sanasi</FormLabel>
                                        <Input width={'300px'}  placeholder='Ish boshlash sanasi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Ish yakunlash sanasi</FormLabel>
                                        <Input width={'300px'}  placeholder='Ish yakunlash sanasi..' />
                                    </FormControl>
                                </Box>

                                <Box display={'flex'}>
                                    <FormControl isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input width={'300px'}  placeholder='Username..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input width={'300px'}  placeholder='Password..' />
                                    </FormControl>
                                    <Button
                                        mt={'30px'}
                                        bg={"#4CAF50"}
                                        color={"#fff"}
                                        size="md"
                                        borderRadius={"3px"}
                                        _hover={"none"}
                                        _active={"none"}
                                        px={'80px'}
                                    >
                                        Qo’shish
                                    </Button>
                                </Box>

                            </Box>


                        </Box>
                    )}


                </Box>
                
            </Box>

            <TableContainer shadow={"0px 2px 8px 0px rgba(0, 0, 0, 0.12)"} mt={'20px'}>
                <Table width={"100%"} rounded={"16px"} fontSize={'15pxpx'}>
                    <Thead>
                        <Tr bg="#F1F3F9" >
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>№</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}> Ismi</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Familiyasi</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Sharfi</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Passport</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Asosiy telefon</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Qo’shimcha telefon</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Lavozimi</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Ish boshlash sanasi</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Ish yakunlash sanasi</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Username</Th>
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Password</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, i) => (
                            <Tr key={i} bg={i % 2 == 1 ? '#F8F9FC' : ''}>
                                <Td>{i + 1}</Td>
                                <Td width={'15px%'}>{item.name}</Td>
                                <Td>{item.address}</Td>
                                <Td>{item.tel}</Td>
                                <Td>{item.email}</Td>
                                <Td>{item.web}</Td>
                                <Td> {String(item.date).slice(0, 4) +
                                    " " +
                                    `${name}` +
                                    " " +
                                    String(item.date).slice(8, 10) +
                                    " " +
                                    String(item.date).slice(11, 16)}</Td>
                                <Td>Muhammadali Anvarov</Td>
                                <Td><MdOutlineMoreVert size={"29px"} /></Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Hodimlar