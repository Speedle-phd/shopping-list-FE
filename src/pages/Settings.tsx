import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import ChangeUsername from '../components/ChangeUsername'
import DeleteUser from '../components/DeleteUser'
import ChangePassword from '../components/ChangePassword'
import EditFavorites from '../components/EditFavorites'
//TODO: Implement Logic
const Settings = () => {


   return (
      <>
         <Flex
            justifyContent={'center'}
            alignItems={'center'}
            marginBlock={'3rem'}
            boxShadow={'0 1px 3px 0 rgba(0,0,0,.5)'}
         >
            <Flex flexDirection={'column'} p='2rem' flexGrow={1}>
               <Heading
                  textAlign='center'
                  color='blue.800'
                  textTransform={'uppercase'}
                  marginBlockEnd={10}
               >
                  Settings
               </Heading>
               <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5}>
                  <EditFavorites
                     props={{ minHeight: '350px', marginTop: '1rem' }}
                  />
                  <ChangeUsername
                     props={{ minHeight: '350px', marginTop: '1rem' }}
                  />
                  <ChangePassword
                     props={{ minHeight: '350px', marginTop: '1rem' }}
                  />
                  <DeleteUser
                     props={{ minHeight: '350px', marginTop: '1rem' }}
                  />
               </SimpleGrid>
            </Flex>
         </Flex>
      </>
   )
}

export default Settings
