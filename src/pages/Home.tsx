import { Divider, Flex, SimpleGrid } from '@chakra-ui/react'
import AddNewList from '../components/AddNewList'
import DashboardCard from '../components/DashboardCard'
import { Await, Link, useLoaderData } from 'react-router-dom'
import { Suspense } from 'react'
import SpinnerLoader from '../components/SpinnerLoader'
import { DatabaseItemListInterface } from '../types/types'

const Home = () => {
   const loaderData = useLoaderData()

   const renderHTML = (loaderData: {
      deferredData: DatabaseItemListInterface[]}) => {
      const { deferredData: data } = loaderData
      return (
         <Flex
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
         >
            <AddNewList />
            <Divider marginBlock={2} />
            <SimpleGrid
               w='100%'
               columns={{ base: 1, md: 2, lg: 3 }}
               gap={3}
               placeItems={'center'}
            >
               <DashboardCard {...data[0]} />
               <DashboardCard {...data[1]} />
               <DashboardCard {...data[2]} />
            </SimpleGrid>
            <Divider marginBlock='1rem' />
            <Link
               style={{ marginBlockEnd: '2rem', fontWeight: '600' }}
               to='collections'
            >
               VIEW ALL COLLECTIONS
            </Link>

         </Flex>
      )
   }

   return (
      <Suspense fallback={<SpinnerLoader/>}>
         <Await resolve={loaderData}>{renderHTML}</Await>
      </Suspense>
   )

}

export default Home
