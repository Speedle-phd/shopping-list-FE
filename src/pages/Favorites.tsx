import { Suspense, useEffect, useState } from 'react'
import { Await,  useActionData, useLoaderData } from 'react-router-dom'
import SpinnerLoader from '../components/SpinnerLoader'
import { ErrorInterface, FavoritesInterface } from '../types/types'
import { Alert, AlertIcon, AlertTitle, Flex,  Heading, SimpleGrid } from '@chakra-ui/react'
import FavoriteItems from '../components/FavoriteItems'
import FavoritesForm from '../components/FavoritesForm'

function isErrorInterfaceLoader(
   obj: ErrorInterface | { deferredData: { favorites: FavoritesInterface[] } }
) : obj is ErrorInterface {
   return "statuscode" in obj
}
function isErrorInterfaceAction(
   obj: ErrorInterface | { favorites: FavoritesInterface } 
) : obj is ErrorInterface {
   return "statuscode" in obj
}

const Favorites = () => {
   const loaderData = useLoaderData() as ErrorInterface | {deferredData: {favorites: FavoritesInterface[]}}
   const actionData = useActionData() as {favorites: FavoritesInterface} | ErrorInterface
   const [mount, setMount] = useState(true)
   const [favorites, setFavorites] = useState<FavoritesInterface[]>([])
   const [error, setError] = useState(false)

   useEffect(() => {
      if(!actionData) return
      if(!isErrorInterfaceAction(actionData)) {
         setFavorites(prev => {
            return [...prev!, actionData?.favorites]
         })
      } else {
         setError(true)
      }
      
   }, [actionData])
   
   useEffect(() => {
      const timeout = setTimeout(() => {
         setError(false)
      }, 3000)
      return () => clearTimeout(timeout)
   })

   useEffect(() => {
      if(!mount) return
      if(!isErrorInterfaceLoader(loaderData)) {
         setFavorites(loaderData?.deferredData?.favorites)
         setMount(false)
      }
   }, [loaderData, mount, actionData])

   const renderHTML = () => {
      
      return (
         <Flex p={10} flexDirection={'column'}>
            {error && isErrorInterfaceAction(actionData) ? <Alert position="absolute" status='error' top="2rem" maxWidth="max-content" left="50%" transform={"translateX(-50%)"}>
               <AlertIcon/>
               <AlertTitle>{actionData?.statuscode} - {actionData?.msg}</AlertTitle>
            </Alert> : null}
            <Heading textAlign='center' marginBlockEnd='2rem' color='teal.500'>
               Administer your favorite Items
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap='2rem'>
               <FavoritesForm/>

               <Flex flexDirection={'column'} gap='0.4rem'>
                  {
                  favorites.length > 0 ?
                  (favorites)?.sort((a, b) => a.name.localeCompare(b.name)).map((fav, index) => {
                     const isOdd = index % 2 === 0
                     const { _id: id } = fav
                     return <FavoriteItems key={id} {...fav} isOdd={isOdd} favorites={favorites} setFavorites={setFavorites} />
                  })
               : <Flex justify={"center"} align={"center"} color="teal.500" height="200px">
                  <Heading>No Data Yet.</Heading>
               </Flex>
               }
               </Flex>
            </SimpleGrid>
         </Flex>
      )
   }

   return (
      <Suspense fallback={<SpinnerLoader />}>
         <Await resolve={loaderData}>{renderHTML}</Await>
      </Suspense>
   )
}

export default Favorites
