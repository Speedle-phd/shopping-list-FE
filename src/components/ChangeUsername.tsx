import { Button, FormControl, FormLabel, Heading, Input, chakra } from '@chakra-ui/react'
import { useGlobalAuth } from '../context/AuthContextProvider'
import  { CSSProperties, useRef } from 'react'
import { UserInterface } from '../types/types'
import axios from 'axios'
import '../axios.ts'
import { cookies } from '../utils.ts'

const ChangeUsername = ({props}: {props: CSSProperties}) => {
   const { user, setUserFunction } = useGlobalAuth()!
   const { username } = user!
   const inputRef = useRef<HTMLInputElement>(null)
//TODO: set Error and loading state
   async function handleClick(){
      const value = inputRef?.current?.value
      if(!value) return
      const newUserObj = {...user, username: value} as UserInterface
      try {
         const res = await axios.patch('/auth/settings', {payload: newUserObj})
         if(res.statusText !== 'OK') return
         cookies.remove('panda-eats-cookies', {path: "/"})
         cookies.set('panda-eats-cookies', {
            ...res.data.user,
            token: res.data.token,
         }, {path: "/"})
         setUserFunction(res.data.user)
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <chakra.section marginBlock={4} style={props}>
         <Heading marginBlockEnd={6}>Change your Username</Heading>
         <FormControl marginBlock={4}>
            <FormLabel>Type your new Username here:</FormLabel>
            <Input ref={inputRef} defaultValue={username} type='text' />
         </FormControl>
         <Button onClick={handleClick}>Save new Username</Button>
      </chakra.section>
   )
}

export default ChangeUsername
