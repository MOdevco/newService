import { Box, Button, Image, Input, Popover, PopoverContent, PopoverTrigger, Toast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { plus } from '../../assets'
import axios from 'axios'
import { API } from '../api/api'
import { useToast } from '@chakra-ui/react'

function PopInput({ getApi, inputVal, setnputVal, setData, data, getAPIFetch, isFirmaNomi, setisFirmaNomi }) {
    const [address, setAddress] = useState('')
    const toast = useToast()
    const popRef = useRef()
    const [error, setError] = useState(false)

    const inputRef = useRef(null)

 
    const handelSubmit = () => {

        if (inputVal.length) {
            setError(false)
            setAddress('')
            setnputVal('')
            popRef.current.focus()
            axios.post(`${API}${getAPIFetch}`, {
                name: inputVal,
                address: address
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }, )
                .then((res) => {

                    toast({
                        description: `${res.data.message}`,
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position: 'top-right'
                    })

                    axios.get(`${API}${getApi}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }).then((res => {
                        setData(res.data)
                    }))
                })
        } else {
            setError(true)
        }
    }



    return (
        <Box>
            <input style={{ width: "0", height: "0", padding: "0", margin: "0" }} ref={popRef}></input>
            <Popover>
                <PopoverTrigger >
                        <Image cursor={'pointer'} pl={'8px'} mt={"-30px"} pt={'22px'} w={'20px'} src={plus}></Image>
                </PopoverTrigger>
                <PopoverContent p={'20px'}>
                    <Input ref={inputRef} onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handelSubmit()
                        }
                    }} className={`${error ? "success" : "sucPre"}`} value={inputVal} onChange={(e) => setnputVal(e.target.value)} placeholder='Nomi...'></Input>
                    {setisFirmaNomi && <Input onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handelSubmit()
                        }
                    }} mt={'10px'} className={`${error ? "success" : "sucPre"}`} value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Firma davlati'></Input>}
                    <Button onClick={handelSubmit} bg={'#10B981'} _hover={{ bg: '' }} color={'white'} mt={'10px'}>Yaratish</Button>
                </PopoverContent>
            </Popover>
        </Box>
    )
}

export default PopInput