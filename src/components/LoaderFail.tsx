import { Flex, Heading, Text, Link, Button } from "@chakra-ui/react"
import {  useRouteError } from "react-router-dom"
import { ErrorInterface } from "../types/types"
import {  } from "react-router-dom"
import { Link as ReactLink } from "react-router-dom"


const LoaderFail = () => {
  // const loaderData = useLoaderData() as ErrorInterface
  const routeError = useRouteError() as ErrorInterface
  
  return (
    <Flex justifyContent={"center"} alignItems={"center"} height="500px" flexDirection={"column"}>
      <Heading color="blue.500">Oops... An Error occurred:</Heading>
      <Text marginBlockStart={5} fontWeight={600} fontSize={"1.1rem"} color="rgba(0,0,0,.5)">{routeError?.statuscode} - {routeError?.msg}</Text>
      <Link marginBlock={"2rem"} as={ReactLink} to={`/dashboard`}><Button colorScheme="gray">Back to Dashboard</Button></Link>
    </Flex>
  )
}

export default LoaderFail
