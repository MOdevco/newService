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
import { plus, secure } from '../../assets';
import QurilmaTuriInp from '../SelectsDrob/QurilmaTuriInp';
import Kategoriya from '../SelectsDrob/Kategoriya';
import MahsulotTuri from '../SelectsDrob/MahsulotTuri';
import FirmaNomi from '../SelectsDrob/FirmaNomi';
import FirmaDavlati from '../SelectsDrob/firmaDavlati';
import MiqdorTuri from '../SelectsDrob/MiqdorTuri';
import ValyutaTuri from '../SelectsDrob/ValyutaTuri';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import PopInput from '../popInput/popInput';
const Qabul = () => {
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
    const [option, setOption] = useState([])
    const [dataVal, setDataVal] = useState({ StrixCode: "", QurilmaTuri: "", Kategoriya: "", MaxsulotTuri: "", FirmaNomi: "", FirmaDavlati: "", MiqdorTuri: "", ValyutaTuri: "", KelishNarxi: "", Miqdori: "", KelganSana: "" })
    const [dataAuth, setDataAuth] = useState({ password: "", username: "" })
    const [dataFace, setDataFace] = useState({ birthday: "", firstname: "", lastname: "", middlename: "", passport: "", tel1: "", tel2: "" })
    const toast = useToast()
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes() < 10 ? '0' : '' + date.getMinutes();
    // let endData = dataVal.endDate
    // let endMonth = endData.slice(3, 5)
    // let endDay = endData.slice(0, 2)
    // let endYear = endData.slice(6, 10)
    // let startDate = dataVal.startDate
    // let startMonth = startDate.slice(3, 5)
    // let startDay = startDate.slice(0, 2)
    // let startYear = startDate.slice(6, 10)
    // let birthday = dataFace.birthday
    // let month = birthday.slice(3, 5)
    // let day = birthday.slice(0, 2)
    // let year = birthday.slice(6, 10)
    // let resEnd = `${endDay}-${endMonth}-${endYear}`
    // let resStart = `${startDay}-${startMonth}-${startYear}`
    // let resBirthday = `${day}-${month}-${year}`
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataLogin, setDataLogin] = useState({ username: '', passport: '' })

    const [validItem, setValidItem] = useState(false)
    const [popInp, setpopInp] = useState('')
    const [data, setData] = useState([])

    // const handleValid = () => {
    //     if (!dataFace.firstname.length || !dataFace.lastname.length || !dataFace.middlename.length || !dataFace.birthday.length || !dataFace.passport.length || !dataFace.tel1.length || !dataFace.tel2.length || !dataAuth.password.length || !dataAuth.username.length || !dataVal.endDate.length || !dataVal.startDate.length || !dataVal.stuffId.length) {
    //         setValidItem(true)
    //         onClose()
    //     } else {
    //         setValidItem(false)
    //         onOpen()
    //     }
    // }

    // useEffect(() => {
    //     axios
    //         .get(`${API}api/employee`, {
    //             headers: {
    //                 "ngrok-skip-browser-warning": true,
    //                 "Access-Control-Allow-Origin": "*",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         })
    //         .then((res) => {
    //             setData(res.data);
    //         });
    // }, []);

    // const handleSubmit = (token) => {
    //     axios
    //         .post(`${API}api/employee/new`, {
    //             "auth": {
    //                 "password": dataAuth.password,
    //                 "username": dataAuth.username,
    //             },
    //             "endDate": `${resEnd} ${hour}:${minute}`,
    //             "face": {
    //                 "birthday": `${resBirthday}`,
    //                 "firstname": dataFace.firstname,
    //                 "lastname": dataFace.lastname,
    //                 "middlename": dataFace.middlename,
    //                 "passport": dataFace.passport,
    //                 "tel1": dataFace.tel1,
    //                 "tel2": dataFace.tel2,
    //             },
    //             "startDate": `${resStart} ${hour}:${minute}`,
    //             "stuffId": dataVal.stuffId
    //         }, {
    //             headers: {
    //                 "ngrok-skip-browser-warning": true,
    //                 "Access-Control-Allow-Origin": "*",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             // setDataVal({password: "",username: "", endDate: "",birthday: "", firstname: "", lastname: "", middlename: "", passport:"", tel1:"", tel2:"", startDate:"", stuffId:"" })
    //             toast({
    //                 description: `Malumot saqlandi`,
    //                 status: 'success',
    //                 position: 'top-right',
    //                 duration: 2000,
    //                 isClosable: true,
    //             })

    //             axios
    //                 .get(`${API}api/employee`, {
    //                     headers: {
    //                         "ngrok-skip-browser-warning": true,
    //                         "Access-Control-Allow-Origin": "*",
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

    // const handleLogin = () => {
    //     axios.post(`${API}api/auth/login`, {

    //         "password": dataLogin.passport,
    //         "username": dataLogin.username
    //     }).then((res) => {
    //         if (res.status === 200) {
    //             handleSubmit(res.data.token)
    //         }
    //     })
    // }


    // useEffect(() => {
    //     axios.get(`${API}api/stuff`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         },
    //     })
    //         .then((res) => {
    //             setOption(res.data)
    //         })

    // }, [])

    return (
        <Box>
            <Box>
                <Box>

                    <Box pt={'20px'}>
                        <FormControl>
                            <FormLabel>Strix code</FormLabel>
                            <Input isInvalid={validItem ? true : false} width={'300px'} />
                        </FormControl>
                    </Box>

                    <Box width={'100%'} display={"flex"} alignItems={"center"} pt={'70px'}>
                        <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} gap={'20px'}>

                            <Box display={'flex'} gap={'10px'} justifyContent={'space-between'} w={"100%"}>
                                <FormControl>
                                    <FormLabel>Qurilma turi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <QurilmaTuriInp setData={setData} data={data} />
                                        <PopInput setData={setData} getApi={'api/device-type'} popInp={popInp} setpopInp={setpopInp} apiPost={'api/device-type/new'} />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Kategoriya</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Kategoriya />
                                        <PopInput setData={setData} apiPost={'api/category/new'} popInp={popInp} setpopInp={setpopInp} />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Maxsulot turi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <MahsulotTuri />
                                        <PopInput setData={setData} apiGet={'api/category-types'} apiPost={'api/category-types/new'} popInp={popInp} setpopInp={setpopInp} />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Firma nomi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <FirmaNomi />
                                        <PopInput  setData={setData}  popInp={popInp} setpopInp={setpopInp} apiGet={'api/firm'} apiPost={'api/firm/new'} />
                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Firma davlati</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <FirmaDavlati />
                                        <PopInput />
                                    </Box>
                                </FormControl>

                            </Box>

                            <Box display={'flex'} gap={'10px'} justifyContent={'space-between'} w={"100%"}>

                                <FormControl >
                                    <FormLabel>Miqdor turi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <MiqdorTuri />
                                        <PopInput />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Valyuta turi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <ValyutaTuri />
                                        <PopInput />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Kelish narxi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Input onChange={(e) => setDataVal({ ...dataVal, KelishNarxi: e.target.value })} isInvalid={validItem ? true : false} required width={'300px'} type='text' />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Miqdori</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Input onChange={(e) => setDataVal({ ...dataVal, Miqdori: e.target.value })} isInvalid={validItem ? true : false} required width={'300px'} />
                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Kelgan sana</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Input onChange={(e) => setDataVal({ ...dataVal, KelganSana: e.target.value })} isInvalid={validItem ? true : false} required width={'300px'} />
                                    </Box>
                                </FormControl>

                            </Box>





                            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} mb={'15px'}>
                                <Button
                                    mt={'30px'}
                                    bg={"#10B981"}
                                    color={"#fff"}
                                    fontSize={'16px'}
                                    size="md"
                                    borderRadius={"3px"}
                                    _hover={"none"}
                                    _active={"none"}
                                    px={'25px'}
                                    py={'20px'}
                                >
                                    Saqlash
                                </Button>
                            </Box>
                        </Box>


                    </Box>



                </Box>

            </Box>

            <TableContainer shadow={"0px 2px 8px 0px rgba(0, 0, 0, 0.12)"} mt={'20px'}>
                <Table width={"100%"} rounded={"16px"} fontSize={'15pxpx'}>
                    <Thead>
                        <Tr bg="#F1F3F9" >
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>№</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Kategoriya</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Maxsulot turi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Qurilma turi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Firma</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Davlati</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Miqdor turi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>valyuta turi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Kelish narxi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Miqdori</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>Qabul sanasi</Th>
                            <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'15px'}>User</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        <Tr>
                            <Td>1</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>

                            <Td><MdOutlineMoreVert size={"29px"} /></Td>
                        </Tr>
                        <Tr>
                            <Td>2</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>

                            <Td><MdOutlineMoreVert size={"29px"} /></Td>
                        </Tr>
                        <Tr>
                            <Td>3</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>

                            <Td><MdOutlineMoreVert size={"29px"} /></Td>
                        </Tr>
                        <Tr>
                            <Td>4</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>

                            <Td><MdOutlineMoreVert size={"29px"} /></Td>
                        </Tr>
                        <Tr>
                            <Td>5</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>
                            <Td>Text</Td>

                            <Td><MdOutlineMoreVert size={"29px"} /></Td>
                        </Tr>

                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Qabul