import { Await, useLoaderData } from "react-router-dom"
import FavoritesForm from "../components/FavoritesForm"
import SpinnerLoader from "../components/SpinnerLoader"
import { Suspense } from "react"
import { FavoritesInterface } from "../types/types"
import { Flex, Heading } from "@chakra-ui/react"


const EditFavorites = () => {
  const loaderData = useLoaderData()
  
  const renderHTML = (loaderData: {favorites: {favorites: FavoritesInterface[]}}) => {
    const data = loaderData.favorites.favorites[0]
    console.log(data)
    return (
    <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap="1rem" p={4}>
      <Heading>Edit your Item</Heading>
      <FavoritesForm {...data} />
    </Flex>
    )
    
  }

  return (
    <Suspense fallback={<SpinnerLoader/>}>
      <Await resolve={loaderData}>{renderHTML}</Await>
    </Suspense>
  )
}

export default EditFavorites
