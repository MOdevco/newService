import React, { useEffect, useRef, useState } from 'react'
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
} from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { MdOutlineMoreVert } from 'react-icons/md'
import axios from 'axios';
import Kategoriya from '../SelectsDrob/Kategoriya';
import MahsulotTuri from '../SelectsDrob/MahsulotTuri';
import FirmaNomi from '../SelectsDrob/FirmaNomi';
import MiqdorTuri from '../SelectsDrob/MiqdorTuri';
import ValyutaTuri from '../SelectsDrob/ValyutaTuri';
import PopInput from '../popInput/popInput';
import { API } from '../api/api';

const Qabul = () => {

    const strixCode = useRef(null)

    const [isFirmaNomi,setisFirmaNomi] = useState(false)

    const [validItem, setValidItem] = useState(false)

    const [popInp, setpopInp] = useState('')
    const [data, setData] = useState([])
    // tavarCatigory
    const [tavarVal, setTavarVal] = useState('')
    const [tavar, setTavar] = useState([])
    // tavarCatigory

    // Mahsulot Catigory
    const [mahsulotVal, setMahsulotval] = useState('')
    const [mahsulot, setMahsulot] = useState([])
    // Mahsulot Catigory

    //  Sotuv miqdori
    const [sotuv, setSotuv] = useState([])
    const [sotuvVal, setSotuvVal] = useState('')
    //  Sotuv miqdor

    // Firma Nomi
    const [frima, setFirma] = useState([])
    const [firmaVal, setFirmaVal] = useState()
    
    // Firma Nomi

    // Valyuta
        const [valyutaInp, setValyutaInp] = useState('')
        const [valyuta,setValyuta] = useState([])
    // Valyuta

    useEffect(() => {
        strixCode.current.focus()
        axios
            .get(`${API}api/category`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setTavar(res.data)
            });
        axios
            .get(`${API}api/category-types`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setMahsulot(res.data)
            });
        axios
            .get(`${API}api/unit`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setSotuv(res.data)
            });
        axios
            .get(`${API}api/firm`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setFirma(res.data)
            });
            
        axios
            .get(`${API}api/currency`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setValyuta(res.data)
            });
    }, []);

    return (
        <Box>
            <Box>
                <Box>
                    {/* Strix code */}
                    <Box pt={'40px'}>
                        <FormControl>
                            <FormLabel>Strix code</FormLabel>
                            <Input ref={strixCode} _hover={'none'} borderColor={'#D0D5DD'} isInvalid={validItem ? true : false} width={'300px'} />
                        </FormControl>
                    </Box>
                    {/* Strix code */}

                    <Box width={'100%'} display={"flex"} alignItems={"center"} pt={'70px'}>
                        <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} gap={'20px'}>

                            <Box display={'flex'} gap={'10px'} alignItems={'center'} justifyContent={'space-between'} w={"100%"}>
                                
                                {/* Kategoriya */}
                                <FormControl>
                                    <FormLabel>Kategoriya</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Kategoriya setData={setTavar} data={tavar} />
                                        <PopInput setData={setTavar} data={tavar} getApi={'api/category'} getAPIFetch={"api/category/new"} inputVal={tavarVal} setnputVal={setTavarVal} />
                                    </Box>
                                </FormControl>
                                {/* Kategoriya */}

                                {/* Maxsulot turi */}
                                <FormControl>
                                    <FormLabel>Maxsulot turi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <MahsulotTuri setData={setMahsulot} data={mahsulot} />
                                        <PopInput setData={setMahsulot} data={mahsulot} getApi={'api/category-types'} getAPIFetch={'api/category-types/new'} inputVal={mahsulotVal} setnputVal={setMahsulotval} />
                                    </Box>
                                </FormControl>
                                {/* Maxsulot turi */}

                                {/* Firma nomi */}
                                <FormControl>
                                    <FormLabel>Firma nomi va davlati</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <FirmaNomi setData={setFirma} data={frima} />
                                        <PopInput isFirmaNomi={isFirmaNomi} setisFirmaNomi={setisFirmaNomi} setData={setFirma} data={frima} getApi={'api/firm'} getAPIFetch={'api/firm/new'} inputVal={firmaVal}  setnputVal={setFirmaVal} />
                                    </Box>
                                </FormControl>
                                {/* Firma nomi */}

                                {/* Miqdor turi */}
                                <FormControl >
                                    <FormLabel>Miqdor turi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <MiqdorTuri setData={setSotuv} data={sotuv} />
                                        <PopInput setData={setSotuv} data={sotuv} getApi={'api/unit'} getAPIFetch={'api/unit/new'} inputVal={sotuvVal} setnputVal={setSotuvVal} />
                                    </Box>
                                </FormControl>
                                {/* Miqdor turi */}

                                <FormControl>
                                    <FormLabel>Valyuta turi (kelish)</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <ValyutaTuri setData={setValyuta} data={valyuta}/>
                                        <PopInput setData={setValyuta} data={valyuta} getApi={'api/currency'} getAPIFetch={'api/currency/new'} inputVal={valyutaInp} setnputVal={setValyutaInp} />
                                    </Box>
                                </FormControl>
                            </Box>



                            <Box display={'flex'} gap={'10px'} justifyContent={'space-between'} w={"100%"}>
                               
                                <FormControl>
                                    <FormLabel>Valyuta turi (sotish)</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <ValyutaTuri />
                                        <PopInput setData={setValyuta} data={valyuta} getApi={'api/currency'} getAPIFetch={'api/currency/new'} inputVal={valyutaInp} setnputVal={setValyutaInp} />
                                    </Box>
                                </FormControl>
                                {/* Valyuta turi (sotish) */}

                                {/* Kelish narxi */}
                                <FormControl>
                                    <FormLabel>Kelish narxi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Input borderColor={'#FF6B00'} _hover={'none'} onChange={(e) => setDataVal({ ...dataVal, KelishNarxi: e.target.value })} isInvalid={validItem ? true : false} required width={'300px'} type='text' />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Ketish narxi</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Input borderColor={'#FF6B00'} _hover={'none'} onChange={(e) => setDataVal({ ...dataVal, KelishNarxi: e.target.value })} isInvalid={validItem ? true : false} required width={'300px'} type='text' />
                                    </Box>
                                </FormControl>
                                {/* Kelish narxi */}

                                {/* Miqdori */}
                                <FormControl>
                                    <FormLabel>Miqdori</FormLabel>
                                    <Box display={'flex'} alignItems={'center'} >
                                        <Input borderColor={'#FF6B00'} _hover={'none'} onChange={(e) => setDataVal({ ...dataVal, Miqdori: e.target.value })} isInvalid={validItem ? true : false} required width={'300px'} />
                                    </Box>
                                </FormControl>

                                {/* Kelgan sana */}
                                <FormControl>
                                    <FormLabel>Kelgan sana</FormLabel>
                                    <Box >
                                        <Input borderColor={'#FF6B00'} _hover={'none'} onChange={(e) => setDataVal({ ...dataVal, KelganSana: e.target.value })} isInvalid={validItem ? true : false} required width={'300px'} />
                                    </Box>
                                </FormControl>
                                {/* Kelgan sana */}
                            </Box>


                            <Box >
                                <Button
                                    mt={'15px'}
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

            <TableContainer shadow={"0px 2px 8px 0px rgba(0, 0, 0, 0.12)"} mt={'50px'}>
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