import { AddIcon } from '@chakra-ui/icons'
import { SimpleGrid, Badge, Text, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const AddNewList = () => {
   
   return (
      <SimpleGrid p={'1.5rem 1rem'} columns={{ base: 1, sm: 2, md: 3 }} gap={2}>
         <Box as='header'>
            <Link
               to='add-list'
               state={'food'}
               style={{ display: 'flex', justifyContent: 'center' }}
            >
               <Badge
                  width={{ base: '12rem', sm: '100%' }}
                  fontSize={{ base: '0.7rem', sm: '0.9rem', md: '1.1rem' }}
                  rounded='md'
                  display='flex'
                  alignItems={'center'}
                  background='blue.200'
                  p='0.3rem 0.5rem'
               >
                  <AddIcon mr={3} />
                  <Text>Add new food list</Text>
               </Badge>
            </Link>
         </Box>
         <Box as='header'>
            <Link
               to='add-list'
               state={'home'}
               style={{ display: 'flex', justifyContent: 'center' }}
            >
               <Badge
                  width={{ base: '12rem', sm: '100%' }}
                  fontSize={{ base: '0.7rem', sm: '0.9rem', md: '1.1rem' }}
                  rounded='md'
                  display='flex'
                  alignItems={'center'}
                  background='teal.200'
                  p='0.3rem 0.5rem'
               >
                  <AddIcon mr={3} />
                  <Text>Add new home list</Text>
               </Badge>
            </Link>
         </Box>
         <Box as='header'>
            <Link
               to='add-list'
               state={'misc'}
               style={{ display: 'flex', justifyContent: 'center' }}
            >
               <Badge
                  width={{ base: '12rem', sm: '100%' }}
                  fontSize={{ base: '0.7rem', sm: '0.9rem', md: '1.1rem' }}
                  rounded='md'
                  display='flex'
                  alignItems={'center'}
                  background='yellow.200'
                  p='0.3rem 0.5rem'
               >
                  <AddIcon mr={3} />
                  <Text>Add new misc list</Text>
               </Badge>
            </Link>
         </Box>
      </SimpleGrid>
   )
}

export default AddNewList
