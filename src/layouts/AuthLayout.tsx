import { Box, Flex, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BoxObject} from '../types/types.ts'


const animationKeyframes = keyframes`
   100% { opacity: 1}
   75% {opacity: 1}
   50% {opacity: 0.5}
   25% {opacity: 1}
   0% {opacity: 1}
`
const animation = `${animationKeyframes} 10s linear alternate infinite`

const AuthLayout = () => {
   const [boxes, setBoxes] = useState<BoxObject[] | null>(null)

   const renderBoxes = useCallback(() => {
      let boxArray : BoxObject[] = []
      for(let i = 0; i < 80; i++){
         const border = Math.random()*0.6
         const color = Math.random()*0.9
         const radius = Math.random()*25+100
         const translateX = (Math.random()) * 100
         const translateY = (Math.random()) * 100
         const transitionX = (50 - (Math.random() * 100)).toString() + "%"
         const transitionY = (50 - (Math.random() * 100)).toString() + "%"
         boxArray = [...boxArray, {
            i, 
            border, 
            color, 
            radius, 
            translateX, 
            translateY,
            transitionX, 
            transitionY,

         }]
      }
      setBoxes(boxArray)
   },[])
   useEffect(() => {
      renderBoxes()
   },[renderBoxes])

   return (
      <Flex
         overflow={'hidden'}
         w='calc(100vw - 0.5rem)'
         minH={'100dvh'}
         filter={'blur(.1px)'}
         position={'relative'}
         role='group'
         bgColor='gray.100'
         marginInline={"auto"}
      >
         {(boxes ?? []).map((box) => {
            const {
               i,
               color,
               border,
               radius,
               translateX,
               translateY,
               transitionX,
               transitionY,
            } = box
            return (
               <Box
                  key={i}
                  as={motion.div}
                  bgColor={`hsla(208, 70%, 68%, ${color})`}
                  position={'absolute'}
                  borderRadius={'50%'}
                  border={`3px solid hsla(208, 70%, 68%, ${border})`}
                  w={`${radius}px`}
                  h={`${radius}px`}
                  top={`${translateX}%`}
                  left={`${translateY}%`}
                  animation={animation}
                  transition='transform 5s ease'
                  boxShadow={'inset 0 0 10px rgba(0,0,0,0.2)'}
                  _groupHover={{
                     transform: `scale(1.3) translateX(${transitionX}) translateY(${transitionY})`,
                  }}
               ></Box>
            )
         })}
         <Outlet />
      </Flex>
   )
}
export default AuthLayout
