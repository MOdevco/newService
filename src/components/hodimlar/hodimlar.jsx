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
    Select,
    Stack,
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
    const [open, setopen] = useState(false);
    const handleClick = () => setopen(!open);
    const [data, setData] = useState([])
    const [option, setOption] = useState([])
    const [dataVal, setDataVal] = useState({ ismi: '', familiyasi: '', sharfi: '', passport: '', tel1: "", tel2: "", lavozimi: "", start: "", end: "", username: "", pass: "", birthday: "" })
    const toast = useToast()
    console.log(data);
    useEffect(() => {
        axios
            .get(`${API}api/employee`, {
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
            .post(`${API}api/employee/new`, {
                "auth": {
                    "password": dataVal.pass,
                    "username": dataVal.username,
                },
                "endDate": dataVal.end,
                "face": {
                    "birthday": dataVal.birthday, 
                    "firstname": dataVal.ismi,
                    "lastname": dataVal.familiyasi,
                    "middlename": dataVal.sharfi,
                    "passport": dataVal.passport,
                    "tel1": dataVal.tel1,
                    "tel2": dataVal.tel2,
                },
                "startDate": dataVal.start,
                "stuff": {
                    "name": dataVal.lavozimi,
                } ,
            }, {
                headers: {
                    // "ngrok-skip-browser-warning": true,
                    // "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            })
            .then((res) => {
                setDataVal({ ismi: '', familiyasi: '', sharfi: '', passport: '', tel1: "", tel2: "", lavozimi: "", start: "", end: "", username: "", pass: "", birthday: ""  })
                toast({
                    description: `Malumot saqlandi`,
                    status: 'success',
                    position: 'top-right',
                    duration: 2000,
                    isClosable: true,
                })
                axios
                    .get(`${API}api/employee`, {
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


    useEffect(() => {
        axios.get(`${API}api/stuff`, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((res) => {
            setOption(res.data)
        })
        
    }, [])
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
                                        <Input onChange={(e) => setDataVal({ ...dataVal, ismi: e.target.value })} value={dataVal.ismi} width={'300px'}  placeholder='Ismi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Familiyasi</FormLabel>
                                        <Input required onChange={(e) => setDataVal({ ...dataVal, familiyasi: e.target.value })} value={dataVal.familiyasi} width={'300px'} placeholder='Familiyasi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Sharfi</FormLabel>
                                        <Input required onChange={(e) => setDataVal({ ...dataVal, sharfi: e.target.value })} value={dataVal.sharfi} width={'300px'} type='text' placeholder='Sharfi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Passport</FormLabel>
                                        <Input required onChange={(e) => setDataVal({ ...dataVal, passport: e.target.value })} value={dataVal.passport} width={'300px'}  placeholder='Passport..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Asosiy telefon</FormLabel>
                                        <Input onChange={(e) => setDataVal({ ...dataVal, tel1: e.target.value })} value={dataVal.tel1} width={'300px'}  placeholder='Asosiy telefon..' />
                                    </FormControl>
                                </Box>

                                <Box  display={'flex'}gap={'10px'}>
                                    <FormControl isRequired>
                                        <FormLabel>Qo’shimcha telefon</FormLabel>
                                        <Input onChange={(e) => setDataVal({ ...dataVal, tel2: e.target.value })} value={dataVal.tel2} width={'300px'}  placeholder='Qo’shimcha telefon..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Lavozimi</FormLabel>
                                        <select className='select' placeholder='Lavozim'>
                                            {option.map(item =>(
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Ish boshlash sanasi</FormLabel>
                                        <Input onChange={(e) => setDataVal({ ...dataVal, start: e.target.value })} value={dataVal.start} width={'300px'}  placeholder='Ish boshlash sanasi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Ish yakunlash sanasi</FormLabel>
                                        <Input onChange={(e) => setDataVal({ ...dataVal, end: e.target.value })} value={dataVal.end} width={'300px'}  placeholder='Ish yakunlash sanasi..' />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Tug'ilgan sanasi</FormLabel>
                                        <Input onChange={(e) => setDataVal({ ...dataVal, birthday: e.target.value })} value={dataVal.birthday} width={'300px'} type='date' placeholder='Tugilgan sanasi' />
                                    </FormControl>
                                </Box>

                                <Box display={'flex'}>
                                    <FormControl isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input onChange={(e) => setDataVal({ ...dataVal, username: e.target.value })} value={dataVal.username} width={'300px'}  placeholder='Username..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input onChange={(e) => setDataVal({ ...dataVal, pass: e.target.value })} value={dataVal.pass} width={'300px'}  placeholder='Password..' />
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
                            <Th  fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Ismi</Th>
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
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, i) => (
                            <Tr key={i} bg={i % 2 == 1 ? '#F8F9FC' : ''}>
                                <Td>{i + 1}</Td>
                                <Td>{item.face.firstname}</Td>
                                <Td>{item.face.lastname}</Td>
                                <Td>{item.face.middlename}</Td>
                                <Td>{item.face.passport}</Td>
                                <Td>{item.face.tel1}</Td>
                                <Td>{item.face.tel2}</Td>
                                <Td>{item.stuff.name}</Td>
                                <Td>{item.startDate}</Td>
                                <Td>{item.endDate}</Td>
                                <Td>{item.username}</Td>
                                <Td>{item.pass}</Td>
                                <Td></Td>
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