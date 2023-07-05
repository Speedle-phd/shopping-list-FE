//TODO: Make checkboxes for each item in itemList. Make save button and patch request. Alter progress. Maybe depict progress. Make a delete button with confirmation flag. Make edit button.

import {
   Await,
   Link as RouterLink,
   useLoaderData,
   useLocation,
} from 'react-router-dom'
import {
   CollectionItemsInterface,
   DatabaseItemListInterface,
   ErrorInterface,

} from '../types/types'
import { ChangeEvent, Suspense, useEffect, useState } from 'react'
import SpinnerLoader from '../components/SpinnerLoader'
import {
   Badge,
   Text,
   Highlight,
   chakra,
   Heading,
   Checkbox,
   Progress,
   Flex,
   SimpleGrid,
   Button,
   Link,
} from '@chakra-ui/react'
import { isDatabaseItemList } from '../utils'
import axios from 'axios'
import '../axios.ts'

const List = () => {
   const location = useLocation()
   const collectionId = location.pathname.split('/').at(-1)

   const loaderData = useLoaderData() as {
      list: DatabaseItemListInterface | ErrorInterface
   }
   console.log(loaderData)
   const [data, setData] = useState<CollectionItemsInterface[] | null>(null)
   const [mount, setMount] = useState<boolean>(true)
   const [loading, setLoading] = useState<boolean>(false)
   const [progress, setProgress] = useState<number | null>(null)
   const [departments, setDepartments] = useState<string[]>([])
   const [filter, setFilter] = useState<string>("")
   

   async function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setLoading(true)
      const itemId = e.target.parentElement?.parentElement?.id
      if (data) {
         const modData = data.map((el) => {
            if (el.id === itemId) {
               el.completed = !el.completed
            }
            return el
         })
         //progress
         const completed = modData.reduce(
            (total: number, curr: CollectionItemsInterface) => {
               if (curr.completed) {
                  total++
                  return total
               }
               return total
            },
            0
         )
         const newProgress = (completed / modData.length) * 100
         setProgress(newProgress)
         setData(modData)
         try {
         await axios.patch(`lists/completed/${collectionId}`, {
               items: modData,
            })
         setLoading(false)
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
      }
   }

   function findUniqueDepartments(items: CollectionItemsInterface[]) {
      const uniqueDepartments = ["All",
         ...new Set(items.map((item) => item.department)),
         'Uncategorized'
      ].filter(el => el !== "")
      setDepartments(uniqueDepartments)
   }

   useEffect(() => {
      if (mount) {
         if (isDatabaseItemList(loaderData?.list)) {
            setData(loaderData?.list?.items)
            setProgress(loaderData?.list?.progress)
            setMount(false)
            findUniqueDepartments(loaderData?.list?.items)
         }
      }
   }, [loaderData, mount])

   function handleFilter(category: string) {
      setFilter(category)
   }

   function renderItemList({ list }: { list: DatabaseItemListInterface }) {
      if (Object.keys(list).length === 0) return
      const { _id: id, title, type } = list

      return (
         <>
            <chakra.header
               display={'flex'}
               justifyContent={'center'}
               alignItems={'center'}
               textAlign={'center'}
               position={'relative'}
               marginBlockStart={'3rem'}
            >
               <chakra.div
                  className='list-info'
                  fontSize={10}
                  position={'absolute'}
                  left={0}
                  top={-5}
               >
                  <Highlight
                     styles={{
                        px: '1',
                        py: '0.5',
                        rounded: 'full',
                        bg: 'blue.100',
                     }}
                     query='Collection-ID:'
                  >
                     Collection-ID:
                  </Highlight>
                  <Text color='rgba(0,0,0,.4)'>{id}</Text>
               </chakra.div>
               <chakra.div display='flex' alignItems={'center'} gap='1rem'>
                  <Heading color={'blue.600'}>{title}</Heading>
               </chakra.div>
               <Badge
                  position={'absolute'}
                  top={-5}
                  right={0}
                  background={
                     type === 'food'
                        ? 'blue.200'
                        : type === 'home'
                        ? 'teal.200'
                        : 'yellow.200'
                  }
               >
                  {type}
               </Badge>
            </chakra.header>
            <Progress
               size='sm'
               borderRadius={'0.2rem'}
               colorScheme='teal'
               marginBlock={'2rem'}
               value={progress!}
            />
            <Flex marginBlockEnd={'1rem'} gap='1rem' justifyContent={'end'} flexWrap={"wrap"}>
               {departments.map((department, index) => {
                  return (
                     <Button
                     onClick={() => handleFilter(department)}
                        _hover={{ opacity: 0.8 }}
                        _focusVisible={{ opacity: 0.8 }}
                        border={department === filter ? '3px solid rgba(0,0,0,.4)' : 'none'}
                        key={index}
                        bgColor={
                           department === 'Freezer'
                              ? 'blue.300'
                              : department === 'Bakery'
                              ? 'yellow.300'
                              : department === 'Groceries'
                              ? 'green.300'
                              : department === 'Meat'
                              ? 'red.300'
                              : department === 'Household' ? 'orange.300' : 'gray:300'
                        }
                     >
                        {department}
                     </Button>
                  )
               })}
            </Flex>
            <SimpleGrid gap={'1rem'} columns={{ base: 1, sm: 2, md: 3 }}>
               {(data ?? []).filter(el => {
                  if(!filter || filter === "All") return el
                  if(el.department === filter){
                     return el
                  }
                  if(filter === "Uncategorized" && !el.department) {
                     return el
                  }
               }).sort((a, b) => {
                  if(a.department < b.department) {
                     return -1
                  } else if (a.department > b.department) {
                     return 1
                  } else {
                     return 0
                  }
               }).map((item) => {
                  const { amount, id, name, completed, company, department } = item

                  return (
                     <chakra.div
                        key={id}
                        id={id}
                        boxShadow={"1px 1px 6px 0 rgba(0,0,0,0.5)"}
                        p={3}
                        bgColor={
                           department === 'Freezer'
                              ? 'blue.100'
                              : department === 'Bakery'
                              ? 'yellow.100'
                              : department === 'Groceries'
                              ? 'green.100'
                              : department === 'Meat'
                              ? 'red.100'
                              : department === 'Household'
                              ? 'orange.100'
                              : 'gray.100'
                        }
                     >
                        <Checkbox
                           cursor={'pointer'}
                           isDisabled={loading}
                           isChecked={completed}
                           variant='hidden'
                           opacity={completed ? '0.2' : '1'}
                           onChange={handleChange}
                           textDecoration={completed ? 'line-through' : 'none'}
                        >
                           <Flex flexDirection={'column'} gap='1rem'>
                              <Flex alignItems={'center'} gap='1rem'>
                                 <Highlight
                                    query={amount}
                                    styles={{
                                       px: '4',
                                       py: '1',
                                       rounded: '100vmin',
                                       bg: 'white',
                                       boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)"
                                    }}
                                 >
                                    {amount}
                                 </Highlight>
                                 <Heading fontSize={'1.2rem'}>{name}</Heading>
                              </Flex>
                              <Text color='teal.600' fontWeight={'600'}>
                                 Company:{' '}
                                 <span style={{ color: 'rgba(0,0,0,.5)' }}>
                                    {company || 'Not provided'}
                                 </span>
                              </Text>
                           </Flex>
                        </Checkbox>
                     </chakra.div>
                  )
               })}
            </SimpleGrid>
            <Flex marginBlock={'2rem'} gap="1rem" justifyContent={"center"} flexWrap={"wrap"}>
               <Link
                  as={RouterLink}
                  p="0.3rem 0.7rem"
                  to='edit'
                  bgColor='blue.300'
                  rounded="md"
                  _hover={{ opacity: 0.8 }}
                  _focusVisible={{ opacity: 0.8 }}
               >
                  Edit your list
               </Link>
               <Link
                  as={RouterLink}
                  p="0.3rem 0.7rem"
                  to='/dashboard/collections'
                  bgColor='teal.300'
                  rounded="md"
                  _hover={{ opacity: 0.8 }}
                  _focusVisible={{ opacity: 0.8 }}
               >
                  Back to your collections
               </Link>
            </Flex>
         </>
      )
   }

   return (
      <Suspense fallback={<SpinnerLoader />}>
         <Await resolve={loaderData}>{renderItemList}</Await>
      </Suspense>
   )
}

export default List
