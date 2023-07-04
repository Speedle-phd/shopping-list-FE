import { Button, Grid, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

interface EditButtonControlProps {
   id: number
   handleDelete: () => void
   handleClick: () => void
}
const EditButtonControl = ({ id, handleDelete, handleClick }:  EditButtonControlProps ) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   return (
      <Grid
         gridTemplateColumns={'repeat(6, 1fr)'}
         gridTemplateRows={'1fr 1fr'}
         marginBlock={10}
         gap={3}
      >
         <Button
            gridColumn={{ base: '1 / -1', md: '3 / 5' }}
            gridRow={1 / 1}
            height='3rem'
            background={'teal.200'}
            _hover={{ background: 'teal.300' }}
            _focusVisible={{ background: 'teal.300' }}
            onClick={handleClick}
         >
            Save
         </Button>
         <Link
            as={ReactRouterLink}
            gridColumn={{ base: '1/4', md: '3/4' }}
            gridRow='2 / 3'
            to={`/dashboard/collections/${id}`}
            tabIndex={-1}
         >
            <Button
               size='md'
               background={'red.200'}
               _hover={{ background: 'red.300' }}
               _focusVisible={{ background: 'red.300' }}
               width='100%'
            >
               Cancel
            </Button>
         </Link>
         {/* TODO: HANDLE DELETE FUNCTION */}
         <Button
            size='md'
            gridColumn={{ base: '4/-1', md: '4/5' }}
            colorScheme='gray'
            gridRow={'2 / 3'}
            width={'100%'}
            onClick={onOpen}
         >
            Delete
         </Button>
         <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Text fontWeight='bold' mb='1rem'>
                     Are you sure you want to delete this collection?
                  </Text>
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button colorScheme="red" variant='outline' onClick={handleDelete}>Delete Collection</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </Grid>
   )
}

export default EditButtonControl
