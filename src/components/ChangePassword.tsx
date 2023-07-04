import {
   chakra,
   Heading,
   FormControl,
   FormLabel,
   Input,
   Button,
   Alert,
   AlertIcon,
} from '@chakra-ui/react'
import axios from 'axios'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { AxiosCustomError } from '../api/loader'
import { AxiosCustomErrorInterface } from '../types/types'
import SpinnerLoader from './SpinnerLoader'

const ChangePassword = ({ props }: { props: CSSProperties }) => {
   const oldRef = useRef<HTMLInputElement>(null)
   const newRef = useRef<HTMLInputElement>(null)
   const confirmRef = useRef<HTMLInputElement>(null)
   const [success, setSuccess] = useState<boolean>(false)
   const [error, setError] = useState<AxiosCustomErrorInterface | null>(null)
   const [loading, setLoading] = useState<boolean>(false)

   const handleClick = async () => {
      
      const oldPassword = oldRef.current?.value
      const newPassword = newRef.current?.value
      const confirmPassword = confirmRef.current?.value
      if(!newPassword || !oldPassword || !confirmPassword) return setError({message: 'Please provide every field.'})
      if (newPassword === oldPassword)
         return setError(
            {message: 'Passwords are the same. Please provide a new password'}
         )
      if (newPassword !== confirmPassword) return setError({message: 'Password mismatch'})
      if(newPassword.length < 6) return setError({message: 'Password too short. Provide at least 6 characters'})
      try {
         setLoading(true)
         setError(null)
         const res = await axios.patch(`/auth/settings/password`, {
            payload: { oldPassword, newPassword },
         })
         if (res.statusText !== 'OK') return
         if (res.data) {
            setSuccess(true)
            oldRef.current!.value = ""
            newRef.current!.value = ""
            confirmRef.current!.value = ""
            setLoading(false)
         }
      } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      console.log(error)
      setError({ message: errorRes?.data.msg })
      setLoading(false)
      }
   }

   useEffect(() => {
      if (!success) return
      const timeout = setTimeout(() => {
         setSuccess(false)
      }, 3000)
      return () => {
         clearTimeout(timeout)
      }
   }, [success])
   useEffect(() => {
      if (!error) return
      const timeout = setTimeout(() => {
         setError(null)
      }, 3000)
      return () => {
         clearTimeout(timeout)
      }
   }, [error])

   const handleChange = () => {
      const oldPassword = oldRef.current?.value
      const newPassword = newRef.current?.value
      const confirmPassword = confirmRef.current?.value
      if (
         oldPassword !== newPassword &&
         newPassword === confirmPassword &&
         newPassword
      ) {
         newRef.current!.style.border = '3px solid teal'
         confirmRef.current!.style.border = '3px solid teal'
      } else {
         newRef.current!.style.border = 'none'
         confirmRef.current!.style.border = 'none'
      }
   }

   if(loading){
      return <SpinnerLoader/>
   }

   return (
      <chakra.section marginBlock={4} style={props}>
         <Heading marginBlockEnd={6}>Change your Password</Heading>
         <FormControl marginBlock={4}>
            <FormLabel>Type your old Password here:</FormLabel>
            <Input onChange={handleChange} ref={oldRef} type='password' />
         </FormControl>
         <FormControl marginBlock={4}>
            <FormLabel>Type your new Password here:</FormLabel>
            <Input onChange={handleChange} ref={newRef} type='password' />
         </FormControl>
         <FormControl marginBlock={4}>
            <FormLabel>Confirm your new Password here:</FormLabel>
            <Input onChange={handleChange} ref={confirmRef} type='password' />
         </FormControl>
         <Button onClick={handleClick}>Save new Password</Button>
         {success ? (
            <Alert status='success'>
               <AlertIcon />
               Password was successfully changed!
            </Alert>
         ) : null}
         {error && error.message ? (
            <Alert status='error'>
               <AlertIcon />
               {error?.message}
            </Alert>
         ) : null}
      </chakra.section>
   )
}

export default ChangePassword
