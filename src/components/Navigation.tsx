import {
   Avatar,
   Box,
   Button,
   Flex,
   Heading,
   Hide,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGlobalAuth } from '../context/AuthContextProvider'
import logo from '../assets/img/logo.jpg'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Navigation = () => {
   const { logout, user } = useGlobalAuth()!
   const navigate = useNavigate()
   const { pathname: path } = useLocation()
   function handleLogout<T>(e: T) {
      if (e instanceof KeyboardEvent) {
         if (e.key === 'Enter') {
            logout()
            navigate('/login')
         } else {
            return
         }
      } else {
         logout()
         navigate('/login')
      }
   }


   return (
      <Flex
         as='nav'
         boxShadow={'0 0 10px 0 rgba(0,0,0,.7), 0 0 20px 1px rgba(0,0,0,.4)'}
         p={'1.5rem 1rem'}
         alignItems={'center'}
         justifyContent={'space-between'}
         borderRadius={'0 0 15px 15px'}
      >
         <Link to='/dashboard'>
            <Avatar size={{ base: 'lg', md: 'xl', lg: '2xl' }} src={logo} />
         </Link>
         <Box>
            <Heading fontSize={{ base: '1.2rem', md: '2rem', lg: '3rem' }}>
               Hi {user?.username}!
            </Heading>
            <Text
               color='blue.500'
               fontSize={{ base: '0.8rem', md: '1.2rem', lg: '1.5rem' }}
            >
               Gaze upon the needs of the panda.
            </Text>
         </Box>

         <Flex alignItems={'center'} direction={'column'} gap={1}>
            <Hide below='md'>
               <Flex direction={'column'} gap={1}>
                  {!path.endsWith('/dashboard') ? (
                     <Link to='/dashboard'>
                        <Button w='6rem' size={'sm'} background='gray.300'>
                           Dashboard
                        </Button>
                     </Link>
                  ) : null}
                  {!path.endsWith('/collections') ? (
                     <Link to='/dashboard/collections'>
                        <Button w='6rem' size={'sm'} background='yellow.200'>
                           Collections
                        </Button>
                     </Link>
                  ) : null}
                  {!path.endsWith('/settings') ? (
                     <Link to='/dashboard/settings'>
                        <Button w='6rem' size={'sm'} background='teal.200'>
                           Settings
                        </Button>
                     </Link>
                  ) : null}
                  <Button
                     w='6rem'
                     size={'sm'}
                     background='blue.200'
                     onClick={handleLogout}
                  >
                     Logout
                  </Button>
               </Flex>
            </Hide>
            <Hide above='md'>
               <Menu>
                  <MenuButton
                     as={IconButton}
                     aria-label='Menu-options'
                     icon={<HamburgerIcon />}
                     variant={'solid'}
                     size={{ base: 'md' }}
                     background={'blue.100'}
                     width='max-content'
                  />
                  <MenuList>
                     {!path.endsWith('/dashboard') ? (
                        <Link to='/dashboard'>
                           <MenuItem>Dashboard</MenuItem>
                        </Link>
                     ) : null}
                     {!path.endsWith('/collections') ? (
                        <Link to='collections'>
                           <MenuItem>Collections</MenuItem>
                        </Link>
                     ) : null}
                     {!path.endsWith('/settings') ? (
                        <Link to='settings'>
                           <MenuItem>Settings</MenuItem>
                        </Link>
                     ) : null}
                     <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
               </Menu>
            </Hide>
         </Flex>
      </Flex>
   )
}
export default Navigation
