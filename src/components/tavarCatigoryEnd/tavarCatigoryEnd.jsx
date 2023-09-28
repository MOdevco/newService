import React, { useEffect, useState } from 'react'
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
  import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
  import { MdOutlineMoreVert } from "react-icons/md";
// import TavartableStart from '../tavartableStart/tavartableStart';
import axios from 'axios';
import { API } from '../../api';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
function TavarCatigoryEnd({setCheckVal , handleValCheck}) {

  // const [checkedValue,setValue] = useState([])
  
  
  const handleChange = (e) =>{
    const {value,checked} = e.target

    if(checked){
      setCheckVal(pre => [...pre,value])
    }else{
      setValue(pre =>{
        return [...pre.filter(skill => skill === value)]
      })
    }
  }

    // const monthNames = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    // const d = new Date();
    // let name = monthNames[d.getMonth()];
    // const [open, setopen] = useState(false);
    // const handleClick = () => setopen(!open);
    const [data,setData] = useState([])
    useEffect(() => {
        axios
          .get(`${API}api/category-types`, {
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

  return (
    <Box>
        <TableContainer shadow={"0px 2px 8px 0px rgba(0, 0, 0, 0.12)"}>
          <Table width={"100%"} rounded={"16px"} fontSize={'19px'}>
            <Thead>
              <Tr bg="#F1F3F9" >
                <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'17px'}>№</Th>
                <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'17px'}> Nomi</Th>
                <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'17px'}>Qo’shilgan sana</Th>
                <Th fontWeight={'bold'} color={'#1D2433'} textTransform={'capitalize'} fontSize={'17px'}>User</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item,i) =>(
                <Tr key={i} bg={i % 2 == 1 ? '#F8F9FC' : ''}>
                  
                  <Td w={'0%'}  ><Checkbox size='lg' colorScheme='purple' value={item.id} checked={item.id == item.productCategoryTypes ? true : false} onChange={handleChange} ></Checkbox></Td>
                  <Td  w={'50%'}>{item.name}</Td>
                  <Td> {String(item.date).slice(0, 4) +
                    " " +
                    `${name}` +
                    " " +
                    String(item.date).slice(8, 10) +
                    " " +
                    String(item.date).slice(11, 16)}</Td>
                  <Td>Komiljon Soliyev Xaydarovich</Td>
                </Tr>    
              ))}
                          
            </Tbody>
          </Table>
        </TableContainer>
        <Button onClick={handleValCheck}>Send</Button>
      </Box>
  )
}

export default TavarCatigoryEnd