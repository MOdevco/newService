import { Box } from '@chakra-ui/react'
import React from 'react'
import Qabul from '../components/mahsulotQabuli/mahsulotQabuli'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
function MahsulotQabuli() {
  return (
    <>
      <Tabs variant={'red'}>
        <TabList display={'flex'} alignItems={'center'} pl={'45px'}>
          <Tab _selected={{ color: '#FF5C00' }} fontSize={'20px'} color={'#404E67'} fontWeight={'500'} fontStyle={'normal'} lineHeight={'20px'}>Tovar qabuli</Tab>
          <Tab _selected={{ color: '#FF5C00' }} fontSize={'20px'} color={'#404E67'} fontWeight={'500'} fontStyle={'normal'} lineHeight={'20px'}>Qabul tarixi</Tab>

        </TabList>

        <TabPanels>
          <TabPanel>
            <Box p={'50px'} pt={'0px'} height={'60vh'} width={'100%'}>
              <Qabul />
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default MahsulotQabuli