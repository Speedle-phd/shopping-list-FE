import {
   Form,
   useActionData,
   useLocation,
   useNavigate,
   useNavigation,
} from 'react-router-dom'
import Card from '../components/Card'
import {
   // Alert,
   // AlertIcon,
   Box,
   Button,
   FormControl,
   FormLabel,
   Heading,
   Input,
   InputGroup,
   InputRightAddon,
   Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'
import { useGlobalAuth } from '../context/AuthContextProvider'
import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'
import { AuthDataInterface, ErrorInterface, UserInterface } from '../types/types'
import CustomAlert from '../components/CustomAlert'
import { isError } from '../utils'



const Login = () => {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { setUserFunction, user } = useGlobalAuth()!
   const [error, setError] = useState<boolean>(false)
   const [pwVisible, toggleVisible] = useState<boolean>(true)
   const { pathname: path} = useLocation()
   const pageNavigation = useNavigation()
   const navigate = useNavigate()
   const loginPage = path === '/login'
   const actionData = useActionData() as ErrorInterface | AuthDataInterface
   const formRef = useRef<HTMLFormElement | null>(null)
   

   useEffect(() => {
      if(isError(actionData)){
         if (actionData?.msg && Object.keys(actionData).length !== 0) {
            setError(true)
         }
         setTimeout(() => {
            setError(false)
         }, 4000)
      }
   }, [actionData])

   useEffect(() => {
      if(!isError(actionData)){
         if (actionData?.user && Object.keys(actionData?.user).length !== 0) {
            const cookies = new Cookies()
            cookies.set(
               'panda-eats-cookies',
               { ...actionData?.user, token: actionData?.token },
               { path: '/' }
            )
            setUserFunction(actionData?.user as UserInterface)
            navigate('/dashboard')
         }
      }
   }, [actionData, navigate, setUserFunction])
   if (user) {
      return <Navigate to='/dashboard' />
   }
   return (
      <>
         <Card>
            <Heading mb={5} color='blue.500'>
               #Shopping with Ono
            </Heading>
            <Heading mb={5}>{loginPage ? 'Log in' : 'Register'}</Heading>
            <Form
               method='POST'
               ref={formRef}
            >
               {!loginPage && (
                  <FormControl mb={3}>
                     <FormLabel>Username</FormLabel>
                     <Input
                        required
                        borderColor={'blue.400'}
                        type='text'
                        name='username'
                        id='username'
                     />
                  </FormControl>
               )}
               <FormControl mb={3}>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                     required
                     borderColor={'blue.400'}
                     type='email'
                     name='email'
                     id='email'
                  />
               </FormControl>
               <FormControl mb={3}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                     <Input
                        required
                        borderColor={'blue.400'}
                        type={pwVisible ? 'password' : 'text'}
                        name='password'
                        id='password'
                     />
                     <InputRightAddon
                        onClick={() => {
                           toggleVisible(!pwVisible)
                        }}
                        cursor='pointer'
                        bgColor='blue.200'
                        borderColor='blue.400'
                        borderStyle={'solid'}
                        borderWidth={'1px'}
                        children={pwVisible ? <ViewOffIcon /> : <ViewIcon />}
                     />
                  </InputGroup>
               </FormControl>
               <Button
                  minW={'200px'}
                  color='whiteAlpha.800'
                  bgColor='blue.500'
                  disabled={pageNavigation.state === 'submitting'}
                  type='submit'
                  _hover={{
                     bgColor: 'blue.800',
                  }}
                  _focusVisible={{
                     bgColor: 'blue.800',
                     outline: 'none',
                  }}
               >
                  {pageNavigation.state === 'submitting'
                     ? 'Logging in'
                     : loginPage
                     ? 'Log in'
                     : 'Register'}
               </Button>
               <Box marginBlock={5}>
                  <Text>
                     {loginPage
                        ? 'No Account yet? Just register here:'
                        : 'Already have an account? Log in here:'}
                  </Text>
                  <Link
                     onClick={() => {
                        formRef.current?.reset()
                     }}
                     style={{ textDecoration: 'underline' }}
                     to={`${loginPage ? '/register' : '/login'}`}
                  >
                     {loginPage ? 'Register' : 'Log in'}
                  </Link>
               </Box>
                  <Link to="/forgot-password" style={{color: "rgba(0,0,0,0.6)"}}>{loginPage && 
                     <Button colorScheme='blue' backgroundColor="blue.300">Forgot your password?</Button>
                  }</Link>
            </Form>
         {error && isError(actionData) ?
            <CustomAlert msg={actionData?.msg} statuscode={actionData?.statuscode}/>
            :
            null
         }
         </Card>
      </>
   )
}

export default Login
