import { Box } from '@chakra-ui/react'

import Actions from './Action'
import Data from './Data'
import Prof from './Prof'

function Sidebar({details,callback}) {
  return (
    <Box
      as="aside"
      flex={1}
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="brand.light"
      style={{ transform: 'translateY(-100px)' }}
    >
      <Prof details={details} callback={callback}/>
      
    </Box>
  )
}

export default Sidebar