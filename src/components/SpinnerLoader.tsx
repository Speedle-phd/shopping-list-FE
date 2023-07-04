

import { Spinner, Flex } from "@chakra-ui/react"

const SpinnerLoader = () => {
  return (
     <Flex justifyContent="center" alignItems={"center"} height="500px">
       <Spinner
          size='xl'
          color='teal.500'
          thickness='6px'
          speed='0.65s'
          emptyColor='gray.200'
       />
     </Flex>
  )
}

export default SpinnerLoader
