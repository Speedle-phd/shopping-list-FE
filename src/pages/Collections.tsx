import { Suspense } from 'react'
import { Await, useLoaderData, Link as ReactLink } from 'react-router-dom'
import {
   ErrorInterface,
   DataInterface,
} from '../types/types'
import DashboardCard from '../components/DashboardCard'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box,  Heading, Link, SimpleGrid, Button } from '@chakra-ui/react'
import SpinnerLoader from '../components/SpinnerLoader'



const Collections = () => {
   const dataPromise = useLoaderData() as {
      deferredData: DataInterface | ErrorInterface
   }

   function renderCollections(deferredData: DataInterface) {
      let htmlElements
      let alertElement
      if(deferredData?.listData?.length === 0) {
         alertElement = (
            <Alert
               status='error'
               variant='subtle'
               flexDirection='column'
               alignItems='center'
               justifyContent='center'
               textAlign='center'
               height='200px'
            >
               <AlertIcon boxSize='40px' mr={0} />
               <AlertTitle mt={4} mb={1} fontSize='lg'>
                  No Data Yet.
               </AlertTitle>
               <AlertDescription maxWidth='sm'>
                  Go back to the Dashboard to start creating your first Collection.
               </AlertDescription>
            </Alert>
         )
      } else {
         htmlElements = deferredData?.listData?.map((list) => {
            const { _id: id } = list
            return <DashboardCard key={id} {...list}></DashboardCard>
         })
      }
      return (
         <>
            <Box>
               <Heading
               textAlign={"center"}
               marginBlock={10}
               >Browse through all of your collections</Heading>
               {alertElement ?? null}
               <SimpleGrid
                  w='100%'
                  columns={{ base: 1, md: 2, lg: 3 }}
                  gap={3}
                  placeItems={'center'}
               >
                  {htmlElements}
               </SimpleGrid>
               
               <Link marginBlock={10} as={ReactLink} to="/dashboard" display={"flex"} justifyContent={"center"}><Button colorScheme='yellow'>Back to Dashboard</Button></Link>
            </Box>
         </>
      )
   }

   return (
      <Suspense fallback={<SpinnerLoader/>}>
         <Await resolve={dataPromise?.deferredData}>{renderCollections}</Await>
      </Suspense>
   )
}

export default Collections
