import { Button, Grid, Link, Text } from '@chakra-ui/react'
import axios from 'axios'
import {  useState } from 'react'
import { Link as ReactLink} from 'react-router-dom'
import { FavoritesInterface } from '../types/types'


interface FavoriteItemsProps {
   favorites: FavoritesInterface[]
   setFavorites: React.Dispatch<React.SetStateAction<FavoritesInterface[]>>
   name: string
   company?: string
   department?: string
   _id?: string
   isOdd: boolean
}
console.log(scrollY)
const FavoriteItems = ({
   name: title,
   company,
   department,
   _id: id,
   isOdd,
   favorites,
   setFavorites
}: FavoriteItemsProps) => {
   const isDepartment = department === ''
   const isCompany = company === ''
   const [loading, setLoading] = useState(false)


   async function handleDelete(id: string){
      setLoading(true)
      try {
         const res = await axios.delete(`/favorites/item/${id}`)
         const {data} = res
         const filteredFavorites = favorites?.filter(el => el._id !== data.favorite._id)
         setFavorites(filteredFavorites)
         setLoading(false)
      } catch (error) {
         console.log(error)
         setLoading(false)
      }
   }

   return (
      <Grid
         p={'0.5rem 1rem'}
         bgColor={isOdd ? 'blue.50' : 'whiteAlpha.50'}
         gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr' }}
         position={'relative'}
         gap={4}
         opacity={loading ? "0.5" : "1"}
      >
         <Text gridColumn={'1 / -1'} fontSize={'1.5rem'} fontWeight={'600'}>
            {title}
         </Text>
         <Text
            gridColumn={{ base: '1 / -1', md: 'unset' }}
            color={isCompany ? 'rgba(0,0,0,.3)' : 'gray.700'}
         >
            {isCompany ? 'No company specified' : company}
         </Text>
         <Text
            gridColumn={{ base: '1 / -1', md: 'unset' }}
            color={isDepartment ? 'rgba(0,0,0,.3)' : 'gray.700'}
         >
            {isDepartment ? 'No department specified' : department}
         </Text>
         <Link
            as={ReactLink}
            to={`/dashboard/favorites/${id}`}
            gridColumn={{ base: '1 / -1', sm: 'unset' }}
         >
            <Button
               disabled={loading}
               bgColor={'teal.500'}
               color={'white'}
               _hover={{ opacity: '0.8' }}
               w={'100%'}
               _focusVisible={{ opacity: '0.8' }}
            >
               Edit
            </Button>
         </Link>
         <Button
            disabled={loading}
            bgColor={'red.400'}
            color={'white'}
            _hover={{ opacity: '0.8' }}
            _focusVisible={{ opacity: '0.8' }}
            gridColumn={{ base: '1 / -1', sm: 'unset' }}
            onClick={() => handleDelete(id!)}
         >
            Delete
         </Button>
      </Grid>
   )
}

export default FavoriteItems
