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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { MdOutlineMoreVert } from "react-icons/md";
// import TavartableStart from '../tavartableStart/tavartableStart';
import axios from 'axios';
import { API } from '../../api';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
function TavarCatigoryEnd({ handleValCheck, setCheckVal, setTabsId }) {
  const [data, setData] = useState([])
  const [checkedVal, setValue] = useState([])
  const [v, setV] = useState('')
  const [q, setQ] = useState([])
  let X = []
  let Y = []

  X = data.map((item, i) => item.id)
  Y = q.map((item, i) => item.id)


  const handleChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      setCheckVal(pre => [...pre, value])
    } else {
      setCheckVal(pre => {
        return [...pre.filter(skill => skill === value)]
      })
    }
  }

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


  const [data1, setData1] = useState([])
  useEffect(() => {
    axios
      .get(`${API}api/category`, {
        headers: {
          // "ngrok-skip-browser-warning": true,
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData1(res.data);
      });
  }, []);


  return (
    <Box>

      <Box>
        <Tabs colorScheme='blue'>
          <TabList>
            {data1.map((item, i) => (
              <Box key={i} >
                <Tab onClick={function () {
                  setV(item.id)
                  setQ(item.productCategoryTypes)

                }
                } value={item.id} onChange={setTabsId(item.id)} >{item.name}</Tab>
              </Box>
            ))}

          </TabList>
          <TabPanels>
            <TabPanel>

            </TabPanel>
            <TabPanel>

            </TabPanel>
            <TabPanel>

              <Text></Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>


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

            {data.map(function (item, i) {
              if (Y.includes(item.id)) {
                return (
                  <Tr key={i} bg={i % 2 == 1 ? '#F8F9FC' : ''}>

                    <Td w={'0%'}>  <Checkbox size='lg' colorScheme='purple' isChecked onChange={handleChange} value={item.id} ></Checkbox></Td>
                    <Td w={'50%'}>{item.name}</Td>
                    <Td> {String(item.date).slice(0, 4) +
                      " " +
                      `${name}` +
                      " " +
                      String(item.date).slice(8, 10) +
                      " " +
                      String(item.date).slice(11, 16)}</Td>
                    <Td>Komiljon Soliyev Xaydarovich</Td>
                  </Tr>
                )
              } else {
                return (
                  <Tr key={i} bg={i % 2 == 1 ? '#F8F9FC' : ''}>

                    <Td w={'0%'}>  <Checkbox size='lg' colorScheme='purple' onChange={handleChange} value={item.id}></Checkbox></Td>
                    <Td w={'50%'}>{item.name}</Td>
                    <Td> {String(item.date).slice(0, 4) +
                      " " +
                      `${name}` +
                      " " +
                      String(item.date).slice(8, 10) +
                      " " +
                      String(item.date).slice(11, 16)}</Td>
                    <Td>Komiljon Soliyev Xaydarovich</Td>
                  </Tr>
                )
              }
            })}

          </Tbody>
        </Table>
      </TableContainer>
      <Box display={'flex'} alignItems={'flex-end'} mt={'15px'} justifyContent={'flex-end'}>
        <Button _hover={'none'} _active={'none'} bg={'green.400'} color={'white'} onClick={handleValCheck}>Send</Button>
      </Box>

      {X.map(function (l) {
        if (Y.includes(l)) {
          // console.log(true);
        } else {
          // console.log(false);
        }
      })}

    </Box>
  )
}

export default TavarCatigoryEnd