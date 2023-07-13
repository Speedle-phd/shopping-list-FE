import { Form, useActionData, useLocation } from 'react-router-dom'
import BackToDashboard from '../components/BackToDashboard'
import Card from '../components/Card'
import { Button, Flex,FormControl, FormLabel, Heading, Highlight, Input, Select, chakra } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import CustomAlert from '../components/CustomAlert'
import { ErrorInterface } from '../types/types'

//TODO: Handle Error with Alert

const AddNewListForm = () => {
   const errorActionData = useActionData() as ErrorInterface
   const { state: listCategory } = useLocation()
   const formRef = useRef<HTMLFormElement>(null)
   const bubbleOneRef = useRef<HTMLDivElement>(null)
   const bubbleTwoRef = useRef<HTMLDivElement>(null)
   const [error, setError] = useState<boolean>(false)

   useEffect(() => {
      if (errorActionData?.msg && errorActionData.statuscode &&Object.keys(errorActionData).length !== 0) {
         setError(true)
      }
      setTimeout(() => {
         setError(false)
      }, 4000)
   }, [errorActionData])


   function handleMouseMove(e: MouseEvent){
      const {clientX: cx, clientY: cy} = e as MouseEvent
      const transDirectionOne = ""
      const transDirectionTwo = "-"
      const transformStringOne = `translate(${transDirectionTwo}${cx/Math.PI}px, ${transDirectionOne}${cy/Math.PI/2}px)`
      const transformStringTwo = `translate(${transDirectionOne}${cx/Math.PI}px, ${transDirectionTwo}${cy/Math.PI/10}px)`
      if(!(e.target as HTMLElement).closest('.addForm') && bubbleOneRef.current && bubbleTwoRef.current) {
         (bubbleOneRef.current as HTMLDivElement).style.scale = '1'
         ;(bubbleTwoRef.current as HTMLDivElement).style.scale = '1'
         return
      }
      (bubbleOneRef.current as HTMLDivElement).style.transform = transformStringOne
      ;(bubbleTwoRef.current as HTMLDivElement).style.transform = transformStringTwo
      ;(bubbleOneRef.current as HTMLDivElement).style.scale = "1.3"
      ;(bubbleTwoRef.current as HTMLDivElement).style.scale = "1.3"
      
   }

   useEffect(() => {
      (document).addEventListener('mousemove', handleMouseMove)
      
      return () => (document).removeEventListener('mousemove', handleMouseMove)
   }, [])

   return (
      <Flex
         direction={'column'}
         justifyContent={'center'}
         alignItems={'center'}
         marginBlock={'5rem'}
         gap='2rem'
         overflow='hidden'
      >
         <Form
            style={{ position: 'relative', overflow: 'hidden' }}
            method='post'
            ref={formRef}
            className='addForm'
         >
            <Card>
               <chakra.div
                  ref={bubbleOneRef}
                  width='25rem'
                  h='25rem'
                  background='blue.100'
                  position={'absolute'}
                  bottom={'-100px'}
                  right={'-120px'}
                  rounded={'full'}
                  filter={'blur(70px)'}
                  opacity={0.8}
                  transition="0.5s ease"
               ></chakra.div>
               <chakra.div
                  ref={bubbleTwoRef}
                  width='7rem'
                  h='7rem'
                  background='teal.400'
                  position={'absolute'}
                  top={'-30px'}
                  left={'-30px'}
                  rounded={'full'}
                  filter={'blur(70px)'}
                  opacity={0.8}
                  transition="0.5s ease"
               ></chakra.div>
               <Heading mb={8} color='blue.500'>
                  Add a new {listCategory ?? null} collection
               </Heading>
               <FormControl marginBlock={3}>
                  <FormLabel>
                     <Highlight
                        query='Title'
                        styles={{
                           px: '4',
                           py: '0',
                           rounded: 'full',
                           bg: 'blue.100',
                        }}
                     >
                        Title
                     </Highlight>{' '}
                     of your list
                  </FormLabel>
                  <Input
                     required
                     borderColor={'blue.400'}
                     type='text'
                     name='title'
                     id='title'
                  />
               </FormControl>
               <FormControl marginBlock={3}>
                  <FormLabel>
                     <Highlight
                        query='Type'
                        styles={{
                           px: '4',
                           py: '0',
                           rounded: 'full',
                           bg: 'blue.100',
                        }}
                     >
                        Type
                     </Highlight>{' '}
                     of your list
                  </FormLabel>
                  <Select
                     name="type"
                     id="type"
                     fontSize={{ base: '0.8rem', md: '1rem' }}
                     textOverflow={'ellipsis'}
                     overflow={'hidden'}
                     whiteSpace={'nowrap'}
                     placeholder='Select the type of your List'
                     defaultValue={listCategory ?? null}
                  >
                     <option value='food'>Food</option>
                     <option value='home'>Home related Items</option>
                     <option value='misc'>Miscellaneous Items</option>
                  </Select>
               </FormControl>
               <Button
                  mt={6}
                  type='submit'
                  w='max-content'
                  background='blue.300'
                  marginInline='auto'
               >
                  Create your list
               </Button>
            </Card>
            {error && errorActionData.msg && errorActionData.statuscode?
            <CustomAlert msg={errorActionData?.msg} statuscode={errorActionData.statuscode}/>
            :
            null
            }
         </Form>
         <BackToDashboard />
      </Flex>
   )
}

export default AddNewListForm
