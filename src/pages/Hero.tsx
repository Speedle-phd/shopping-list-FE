import { Button, Heading, Text} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Card from "../components/Card"

const Hero = () => {
   return (
      <Card>
         <Heading color='blue.500'>#PurchaseWith<br/>
         Panda</Heading>
         <Text color='gray.600' marginBlock={8}>
            Welcome to Panda's shopping reminder list.
            <br />
            Since Ono always yearns for waffles, <br />
            he programmed this app, so buttermilk is bought <br />
            on every occasion and will never be forgotten again. <br />
            <br />
            Log in to manage your collections, <br />
            but don't forget the buttermilk.
         </Text>
         <Link tabIndex={-1} to='login'>
            <Button
               _hover={{
                  bgColor: 'blue.800',
               }}
               _focusVisible={{
                  bgColor: 'blue.800',
                  outline: 'none',
               }}
               bgColor='blue.300'
               color='whiteAlpha.800'
            >
               Login
            </Button>
         </Link>
      </Card>
   )
}

export default Hero
