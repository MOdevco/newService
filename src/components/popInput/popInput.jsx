import { Box, Button, Image, Input, Popover, PopoverContent, PopoverTrigger, Toast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { plus } from '../../assets'
import axios from 'axios'
import { API } from '../api/api'
import { useToast } from '@chakra-ui/react'
function  PopInput({apiPost,setpopInp,popInp,getApi,setData}) {
    const toast = useToast()
    const [visible , setVisible] = useState(true)
    const handelSubmit = () =>{

        axios.post(`${API}${apiPost}`,{
            "name": popInp
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {

            toast({
                description: `${res.data.message}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
      
            axios.get(`${API}${getApi}`, {
                headers: {
                    // "ngrok-skip-browser-warning": true,
                    // "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res => {
                setData(res.data)
            }))
        })
    }

    return (
        <Box>
            <Popover>
                <PopoverTrigger >
                    <Image cursor={'pointer'} pl={'8px'} pt={'22px'} w={'20px'} src={plus}></Image>
                </PopoverTrigger>
               {visible && <PopoverContent p={'20px'}>
                    <Input onChange={(e) => setpopInp(e.target.value)} placeholder='Nomi...'></Input>
                    <Button onClick={handelSubmit} bg={'#10B981'} _hover={{ bg: '' }} color={'white'} mt={'10px'}>Yaratish</Button>
                </PopoverContent>}
            </Popover>
        </Box>
    )
}

export default PopInput