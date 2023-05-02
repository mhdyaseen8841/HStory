import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import AccountSettings from './AccountSettings'
import Actions from './Actions'
import CompanySettings from './CompanySettings'
import Notifications from './Notifications'

const Content = ({details,callback}) => {
 
  console.log(details);
  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: 'translateY(-100px)' }}
    >
      <Tabs>
        

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings data={details} updateSubmit={callback} />
          </TabPanel>
          
        </TabPanels>
      </Tabs>

      {/* <Actions /> */}
    </Box>
  )
}

export default Content
