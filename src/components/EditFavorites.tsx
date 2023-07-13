import { Heading, chakra, Text, Link, Highlight, Button } from '@chakra-ui/react'
import { CSSProperties } from 'react'
import {Link as ReactLink} from 'react-router-dom'

const EditFavorites = ({ props }: { props: CSSProperties }) => {

   return (
      <chakra.section style={props} display="flex" flexDirection={"column"} gap={6}>
         {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
         {/* @ts-ignore */}
         <Heading style={{textWrap: "balance"}}>Manage your favorite Items</Heading>

         <Text>
            <Highlight query={"Favorites"} styles={{w:"max-content", background: "teal.200", p: "0.2rem 0.5rem", rounded: "1rem"}}>Favorites</Highlight> are suggested when adding items to your collections, so you can auto-complete your often purchased items.
         </Text>

         <Text>Click the Link below to manage - add, update, remove - your favorite items.</Text>

         <Link as={ReactLink} to="/dashboard/favorites"><Button colorScheme='teal'>Manage your favorites</Button></Link>
      </chakra.section>
   )
}

export default EditFavorites
