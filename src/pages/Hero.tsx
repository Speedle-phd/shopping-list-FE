import { Button, Heading, Text} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Card from "../components/Card"

const Hero = () => {
   return (
      <Card>
         <Heading color='blue.500'>#Shopping with<br/>
         Michi</Heading>
         <Text color='gray.600' marginBlock={8}>
            {/* Welcome to Panda's shopping reminder list.
            <br />
            Since Ono always yearns for waffles, <br />
            he programmed this app, so buttermilk is bought <br />
            on every occasion and will never be forgotten again. <br />
            <br />
            Log in to manage your collections, <br />
            but don't forget the buttermilk. */}
            Willkommen zu Michi's Einkaufs-Erinnerungsliste. <br />
            Da Michi zur Zeit nicht genug von Süßkartoffeln-Pasta bekommt, muss sie eine nie abschließende Liste haben, um sicherzustellen, dass sie immer genug Zutaten hat. <br />
            Wäre dies nicht gewährleistet, würde sie sich in eine süße Süßkartoffel verwandeln. <br />
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
