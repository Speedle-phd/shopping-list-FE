import { Form, useActionData } from 'react-router-dom'
import Card from '../components/Card'
import { Button, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AuthDataInterface, ErrorInterface } from '../types/types'
import { useEffect, useState } from 'react'
import CustomAlert from '../components/CustomAlert'
import { isError } from '../utils'

const Reset = () => {
   const actionData = useActionData() as AuthDataInterface | ErrorInterface
   const [error, setError] = useState<boolean>(false)
   useEffect(() => {
      if(isError(actionData)){
         if (actionData?.msg && Object.keys(actionData).length !== 0) {
            setError(true)
         }
      }
      setTimeout(() => {
         setError(false)
      }, 4000)
   }, [actionData])
   return (
      <Card>
         <Heading as='h2' color={'blue.600'} textDecoration={'underline'}>
            Reset your password
         </Heading>
         <Form style={{ marginBlock: '1.5rem' }} method='PATCH'>
            <FormControl>
               <FormLabel textAlign={'center'}>Email Address</FormLabel>
               <Input
                  required
                  borderColor={'blue.400'}
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Enter your email address...'
               />
            </FormControl>
            <Button mt={7} colorScheme='blue' type='submit' formNoValidate>
               Reset
            </Button>
         </Form>
         <Text>
            Oh wait... I just remembered!
            <br />{' '}
            <Link
               style={{ textDecoration: 'underline', color: 'rgba(0,0,0,.6)' }}
               to='/login'
            >
               Send me back to Login
            </Link>
         </Text>
         {error && isError(actionData) ? (
            <CustomAlert
               msg={actionData?.msg}
               statuscode={actionData?.statuscode}
            ></CustomAlert>
         ) : null}
      </Card>
   )
}

export default Reset
