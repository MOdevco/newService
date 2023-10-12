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
    const [dataVal, setDataVal] = useState({endDate: "", startDate:"", stuffId:"" })
    const [dataAuth, setDataAuth] = useState({password: "",username: ""})
    const [dataFace, setDataFace] = useState({birthday: "", firstname: "", lastname: "", middlename: "", passport:"", tel1:"", tel2:""})
    const toast = useToast()
    console.log(dataVal);
    console.log(dataFace);
    console.log(dataAuth);
    useEffect(() => {
        axios
            .get(`${API}api/employee`, {
                headers: {
                    "ngrok-skip-browser-warning": true,
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setData(res.data);
            });
    }, []);
    const [val , setVal] = useState('')

    const date = new Date()

    const hour = date.getHours()
    const minute = date.getMinutes() < 10 ? '0' : '' + date.getMinutes();


    let endData = dataVal.endDate
    let endMonth = endData.slice(3, 5)
    let endDay = endData.slice(0, 2)
    let endYear = endData.slice(6, 10)
    let startDate = dataVal.startDate
    let startMonth = startDate.slice(3, 5)
    let startDay = startDate.slice(0, 2)
    let startYear = startDate.slice(6, 10)
    let birthday = dataFace.birthday
    let month = birthday.slice(3, 5)
    let day = birthday.slice(0, 2)
    let year = birthday.slice(6, 10)

    let resEnd = `${endDay}-${endMonth}-${endYear}`
    let resStart = `${startDay}-${startMonth}-${startYear}`
    let resBirthday = `${day}-${month}-${year}`
    console.log(resEnd);
    const handleSubmit = () => {
        axios
            .post(`${API}api/employee/new`, {
                "auth": {
                    "password": dataAuth.password,
                    "username": dataAuth.username,
                },
                "endDate": `${resEnd} ${hour}:${minute}`,
                "face": {
                    "birthday": `${resBirthday}`, 
                    "firstname": dataFace.firstname,
                    "lastname": dataFace.lastname,
                    "middlename": dataFace.middlename,
                    "passport": dataFace.passport,
                    "tel1": dataFace.tel1,
                    "tel2": dataFace.tel2,
                },
                "startDate": `${resStart} ${hour}:${minute}`,
                "stuffId": dataVal.stuffId
            }, {
                headers: {
                    "ngrok-skip-browser-warning": true,
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                // setDataVal({password: "",username: "", endDate: "",birthday: "", firstname: "", lastname: "", middlename: "", passport:"", tel1:"", tel2:"", startDate:"", stuffId:"" })
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
                            "ngrok-skip-browser-warning": true,
                            "Access-Control-Allow-Origin": "*",
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
    console.log(val);
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
                                        <Input onChange={(e) => setDataFace({ ...dataFace , firstname: e.target.value  })} value={dataFace.firstname} width={'300px'}  placeholder='Ismi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Familiyasi</FormLabel>
                                        <Input required onChange={(e) => setDataFace({ ...dataFace, lastname: e.target.value })} value={dataFace.lastname} width={'300px'} placeholder='Familiyasi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Sharfi</FormLabel>
                                        <Input required onChange={(e) => setDataFace({ ...dataFace, middlename: e.target.value })} value={dataFace.middlename} width={'300px'} type='text' placeholder='Sharfi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Passport</FormLabel>
                                        <Input required onChange={(e) => setDataFace({ ...dataFace, passport: e.target.value })} value={dataFace.passport} width={'300px'}  placeholder='Passport..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Asosiy telefon</FormLabel>
                                        <Input onChange={(e) => setDataFace({ ...dataFace , tel1: e.target.value })} value={dataFace.tel1} width={'300px'}  placeholder='Asosiy telefon..' />
                                    </FormControl>
                                </Box>

                                <Box  display={'flex'}gap={'10px'}>
                                    <FormControl isRequired>
                                        <FormLabel>Qo’shimcha telefon</FormLabel>
                                        <Input onChange={(e) => setDataFace({ ...dataFace , tel2: e.target.value })} value={dataFace.tel2} width={'300px'}  placeholder='Qo’shimcha telefon..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Lavozimi</FormLabel>
                                        <Select onChange={(e) => setDataVal({...dataVal, stuffId: e.target.value })}  w={'300px'}>
                                            {option.map((item , i) =>(
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Ish boshlash sanasi</FormLabel>
                                        <Input type='text' onChange={(e) => setDataVal({ ...dataVal, startDate: e.target.value })} value={dataVal.startDate} width={'300px'}  placeholder='Ish boshlash sanasi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Ish yakunlash sanasi</FormLabel>
                                        <Input type='text' onChange={(e) => setDataVal({ ...dataVal, endDate: e.target.value })} value={dataVal.endDate} width={'300px'}  placeholder='Ish yakunlash sanasi..' />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Tug'ilgan sanasi</FormLabel>
                                        <Input onChange={(e) => setDataFace({ ...dataFace, birthday: e.target.value })} value={dataFace.birthday} width={'300px'}  placeholder='Tugilgan sanasi' />
                                    </FormControl>
                                </Box>

                                <Box display={'flex'}>
                                    <FormControl isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input onChange={(e) => setDataAuth({ ...dataAuth , username: e.target.value })} value={dataAuth.username} width={'300px'}  placeholder='Username..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input onChange={(e) => setDataAuth({ ...dataAuth , password: e.target.value })} value={dataAuth.password} width={'300px'}  placeholder='Password..' />
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
                                <Td>{item.password}</Td>
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