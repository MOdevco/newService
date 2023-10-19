import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
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
function Status() {
    const handleClick = () => setopen(!open);
    const [open, setopen] = useState(false);
    const [dataVal, setDataVal] = useState({ address: '', email: '', name: '', tel: '', web: "" })
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
                    <Box width={'50%'} display={"flex"} alignItems={"center"}>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} gap={'20px'}>
                            <FormControl isRequired>
                                <FormLabel>Nomi</FormLabel>
                                <Input onChange={(e) => setDataVal({ ...dataVal, name: e.target.value })} value={dataVal.name} placeholder='Nomi..' />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Address</FormLabel>
                                <Input onChange={(e) => setDataVal({ ...dataVal, address: e.target.value })} value={dataVal.address} placeholder='Address..' />
                            </FormControl>


                            <Button

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

export default Status