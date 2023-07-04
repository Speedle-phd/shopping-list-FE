import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, chakra, useDisclosure, Text } from "@chakra-ui/react"
import axios from "axios"
import { CSSProperties } from "react"
import { useGlobalAuth } from "../context/AuthContextProvider"


const DeleteUser = ({props} : {props: CSSProperties}) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {logout} = useGlobalAuth()!
   const handleClick = async() => {
      try {
         const res = await axios.delete('/auth/settings')
         if(res.statusText !== 'OK') return
         if(res.data){
            logout()
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <chakra.section marginBlock={4} style={props}>
         <Heading marginBlockEnd={14}>Delete your Account</Heading>
         <Text marginBlock={10} color="red.400" fontWeight={600} fontSize={"2rem"} >Care: This is a destructive option!</Text>
         <Button colorScheme="red" onClick={onOpen}>Delete</Button>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Delete Account</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Are you sure you want to delete your account?
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button colorScheme="red" onClick={handleClick} variant='outline'>Delete account</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </chakra.section>
   )
}

export default DeleteUser
