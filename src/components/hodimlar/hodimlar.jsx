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
    useDisclosure,
    Image,
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
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { secure } from '../../assets';
import { API } from '../api/api';
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
    const [dataVal, setDataVal] = useState({ endDate: "", startDate: "", stuffId: "" })
    const [dataAuth, setDataAuth] = useState({ password: "", username: "" })
    const [dataFace, setDataFace] = useState({ birthday: "", firstname: "", lastname: "", middlename: "", passport: "", tel1: "", tel2: "" })
    const toast = useToast()
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataLogin, setDataLogin] = useState({ username: '', passport: '' })

    const [validItem, setValidItem] = useState(false)

    const handleValid = () => {
        if (!dataFace.firstname.length || !dataFace.lastname.length || !dataFace.middlename.length || !dataFace.birthday.length || !dataFace.passport.length || !dataFace.tel1.length || !dataFace.tel2.length || !dataAuth.password.length || !dataAuth.username.length || !dataVal.endDate.length || !dataVal.startDate.length || !dataVal.stuffId.length) {
            setValidItem(true)
            onClose()
        } else {
            setValidItem(false)
            onOpen()
        }
    }

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

    const handleSubmit = (token) => {
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
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setDataVal({password: "",username: "", endDate: "",birthday: "", firstname: "", lastname: "", middlename: "", passport:"", tel1:"", tel2:"", startDate:"", stuffId:"" })
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

    const handleLogin = () => {
        axios.post(`${API}api/auth/login`, {

            "password": dataLogin.passport,
            "username": dataLogin.username
        }).then((res) => {
            if (res.status === 200) {
                handleSubmit(res.data.token)
            }
        })
    }


    useEffect(() => {
        axios.get(`${API}api/stuff`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
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
                                <Box display={'flex'} gap={'10px'} justifyContent={'space-between'} w={"100%"}>
                                    <FormControl isRequired>
                                        <FormLabel>Ismi</FormLabel>
                                        <Input isInvalid={validItem ? true : false} onChange={(e) => setDataFace({ ...dataFace, firstname: e.target.value })} value={dataFace.firstname} width={'300px'} placeholder='Ismi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Familiyasi</FormLabel>
                                        <Input isInvalid={validItem ? true : false} required onChange={(e) => setDataFace({ ...dataFace, lastname: e.target.value })} value={dataFace.lastname} width={'300px'} placeholder='Familiyasi..' />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Sharfi</FormLabel>
                                        <Input isInvalid={validItem ? true : false} required onChange={(e) => setDataFace({ ...dataFace, middlename: e.target.value })} value={dataFace.middlename} width={'300px'} type='text' placeholder='Sharfi..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Passport</FormLabel>
                                        <Input isInvalid={validItem ? true : false} required onChange={(e) => setDataFace({ ...dataFace, passport: e.target.value })} value={dataFace.passport} width={'300px'} placeholder='Passport..' />
                                    </FormControl>

                                </Box>

                                <Box display={'flex'} justifyContent={'space-between'} w={"100%"}>
                                    <FormControl isRequired>
                                        <FormLabel>Asosiy telefon</FormLabel>
                                        <Input isInvalid={validItem ? true : false} onChange={(e) => setDataFace({ ...dataFace, tel1: e.target.value })} value={dataFace.tel1} width={'300px'} placeholder='Asosiy telefon..' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Qo’shimcha telefon</FormLabel>
                                        <Input isInvalid={validItem ? true : false} onChange={(e) => setDataFace({ ...dataFace, tel2: e.target.value })} value={dataFace.tel2} width={'300px'} placeholder='Qo’shimcha telefon..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Lavozimi</FormLabel>
                                        <Select onChange={(e) => setDataVal({ ...dataVal, stuffId: e.target.value })} w={'300px'}>
                                            {option.map((item, i) => (
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Ish boshlash sanasi</FormLabel>
                                        <Input isInvalid={validItem ? true : false} type='text' onChange={(e) => setDataVal({ ...dataVal, startDate: e.target.value })} value={dataVal.startDate} width={'300px'} placeholder='Ish boshlash sanasi..' />
                                    </FormControl>

                                </Box>

                                <Box display={'flex'} justifyContent={'space-between'} w={"100%"}>
                                    <FormControl>
                                        <FormLabel>Ish yakunlash sanasi</FormLabel>
                                        <Input isInvalid={validItem ? true : false} type='text' onChange={(e) => setDataVal({ ...dataVal, endDate: e.target.value })} value={dataVal.endDate} width={'300px'} placeholder='Ish yakunlash sanasi..' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Tug'ilgan sanasi</FormLabel>
                                        <Input isInvalid={validItem ? true : false} onChange={(e) => setDataFace({ ...dataFace, birthday: e.target.value })} value={dataFace.birthday} width={'300px'} placeholder='Tugilgan sanasi' />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input isInvalid={validItem ? true : false} onChange={(e) => setDataAuth({ ...dataAuth, username: e.target.value })} value={dataAuth.username} width={'300px'} placeholder='Username..' />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input isInvalid={validItem ? true : false} onChange={(e) => setDataAuth({ ...dataAuth, password: e.target.value })} value={dataAuth.password} width={'300px'} placeholder='Password..' />
                                    </FormControl>

                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                                <Image src={secure}></Image>
                                                <Text fontSize={'16px'} textAlign={'center'}>Ushbu operatsiyani amalga oshirish uchun admin tasdig’i kerak</Text>
                                            </ModalHeader>
                                            <ModalBody>

                                                <FormControl>
                                                    <FormLabel>Username</FormLabel>
                                                    <Input isInvalid={validItem ? true : false} onChange={(e) => setDataLogin({ ...dataLogin, username: e.target.value })} placeContent={'username'} type='email' />
                                                </FormControl>

                                                <FormControl>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input isInvalid={validItem ? true : false} onChange={(e) => setDataLogin({ ...dataLogin, passport: e.target.value })} placeContent={'password'} type='email' />
                                                </FormControl>

                                            </ModalBody>

                                            <ModalFooter>
                                                <Button onClick={handleLogin} width={'100%'} bg={'#00AB26'} _hover={{ bg: '' }} color={'white'}  >
                                                    Tasdiqlash
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Box>

                            </Box>

                            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'} mt={'190px'}>
                                <Button

                                    onClick={function () {
                                        onOpen()
                                        handleValid()
                                    }}


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
                    )}



                </Box>

            </Box>

            <TableContainer shadow={"0px 2px 8px 0px rgba(0, 0, 0, 0.12)"} mt={'20px'}>
                <Table width={"100%"} rounded={"16px"} fontSize={'15pxpx'}>
                    <Thead>
                        <Tr bg="#F1F3F9" >
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>№</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Ismi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Familiyasi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Sharfi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Passport</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Asosiy telefon</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Qo’shimcha telefon</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Lavozimi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Ish boshlash sanasi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Ish yakunlash sanasi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Username</Th>
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
                                <Td>{item.face.user.username}</Td>
                                <Td>{item.password}</Td>
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