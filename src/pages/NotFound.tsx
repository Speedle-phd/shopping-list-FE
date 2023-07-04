import { Button, Text, Box, Flex, Image, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import panda from '../assets/img/transparent-panda-64379831c71045.0055402916813650418154.png'

const NotFound = () => {
   return (
      <Flex zIndex={"10000"} width="max-content" justifyContent={"center"} marginInline="auto" alignItems={"center"} flexDirection={"column"} gap="1rem">
         <Box borderRadius="1rem" background="whiteAlpha.700" p="2rem" boxShadow={"inset 0 0 0 5px white, inset 0 0 10px 4px rgba(0,0,0,.9)"}>
            <Heading color='teal.500' textAlign="center" fontSize={{base: "2rem", sm: "3rem"}}>Page not found</Heading>
            <Image width={"25rem"} src={panda} alt='Page not found - 404' height="min-content"
            borderRadius={"1rem"}/>
            <Text textAlign={"center"} fontWeight={"600"} color="rgba(0,0,0,.7)" fontSize={"1.2rem"}>Here aren't any waffles!</Text>
         </Box>
         <Link to='/'><Button colorScheme='teal'>Back to Home</Button></Link>
      </Flex>
   )
}
export default NotFound
