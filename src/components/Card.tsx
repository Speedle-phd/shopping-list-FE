import { Flex } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

const Card : React.FC<PropsWithChildren>= ({children}) => {
   return (
      <Flex
         // position={'absolute'}
         // inset='0'
         
         margin='auto'
         h='max-content'
         width={'clamp(20rem, 50vw, 80rem)'}
         alignItems={'center'}
         justifyContent={'center'}
      >
         <Flex
            border={'1px solid rgba(255,255,255,0.8)'}
            bgColor={'rgba(255,255,255,0.3)'}
            textAlign={'center'}
            w={'100%'}
            p='3rem'
            backdropFilter='auto'
            borderRadius={'8px'}
            backdropBlur='20px'
            direction={'column'}
            boxShadow='inset 0 0 20px 0 rgba(0,0,0,0.2)'
            overflow={'hidden'}
         >
            {children}
         </Flex>
      </Flex>
   )
}

export default Card
