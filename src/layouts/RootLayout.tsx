import { Box, Flex } from '@chakra-ui/react'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import { useGlobalAuth } from '../context/AuthContextProvider'


const RootLayout = () => {
   const {user} = useGlobalAuth()!
   
   return (
      <Flex 
      width={"min(70rem, calc(100vw - 2rem))"}
      direction={"column"} justifyContent={"space-between"} minHeight={"100dvh"}>
         <Navigation/>
         <Box flexGrow={1}>
            {user ? 
               <Outlet />
               :
               <Navigate to="/login"/>
               }
         </Box>
         <Footer/>
      </Flex>
   )
}

export default RootLayout
