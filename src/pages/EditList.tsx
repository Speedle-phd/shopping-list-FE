import {
   Await,
   Form,
   Navigate,
   useLoaderData,
   useLocation,
   useNavigate,
} from 'react-router-dom'
import {
   AxiosCustomErrorInterface,
   CollectionItemsInterface,
   DatabaseItemListInterface,
   ErrorInterface,
   FavoritesInterface,
} from '../types/types'
import React, {

   Suspense,
   createRef,
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react'
import SpinnerLoader from '../components/SpinnerLoader'
import '../axios.ts'
import {
   Alert,
   AlertDescription,
   AlertIcon,
   AlertTitle,
   Badge,
   Box,
   ButtonGroup,
   Editable,
   EditableInput,
   EditablePreview,
   Flex,
   Highlight,
   IconButton,
   Input,
   NumberDecrementStepper,
   NumberIncrementStepper,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   Select,
   SimpleGrid,
   Spinner,
   Text,
   chakra,
   useEditableControls,
} from '@chakra-ui/react'
import {
   AddIcon,
   CheckIcon,
   CloseIcon,
   DeleteIcon,
   EditIcon,
} from '@chakra-ui/icons'

import EditButtonControl from '../components/EditButtonControl'
import axios, { AxiosError } from 'axios'
import { getFormValues, isDatabaseItemList } from '../utils.ts'
import { useDebounce } from '../hooks/useDebounce.tsx'

const EditList = () => {
   const loaderData = useLoaderData() as {
      list: DatabaseItemListInterface | ErrorInterface
   }
   console.log(loaderData)
   //navigate to some URL
   const navigate = useNavigate()
   // getting the listId
   const location = useLocation()
   const locationArray = location.pathname.split('/')
   const collectionId = locationArray.at(-2)

   const titleRef = useRef<HTMLInputElement>(null)
   const [error, setError] = useState<null | AxiosCustomErrorInterface>(null)
   const [loading, setLoading] = useState<boolean>(false)
   const [data, setData] = useState<CollectionItemsInterface[] | null>(null)
   const [redirectFlag, setRedirectFlag] = useState<boolean>(false)
   const [mount, setMount] = useState<boolean>(true)
   const [favorites, setFavorites] = useState<FavoritesInterface[] | null>(null)
   const favRef = useRef<HTMLDivElement>(null)
   const inputRef = useRef<HTMLInputElement>(null)
   const companyRef = useRef<HTMLInputElement>(null)
   const departmentRef = useRef<HTMLSelectElement>(null)
   const [showFav, setShowFav] = useState<boolean>(false)

   useEffect(() => {
      if (mount) {
         isDatabaseItemList(loaderData?.list) &&
            setData(loaderData?.list?.items)
         setMount(false)
      }
   }, [loaderData, mount])

   useEffect(() => {
      setTimeout(() => {
         setError(null)
      }, 3000)
   }, [error])

   const getMyFavorites = async (query: string) => {
      try {
         const res = await axios.get(`/favorites/queries?q=${query}`)

         const { data } = res
         setFavorites(data.splicedList)
         if (data.splicedList.length > 0) {
            setShowFav(true)
         } else {
            setShowFav(false)
         }
      } catch (error) {
         console.log(error)
         setFavorites(null)
         setShowFav(false)
      }
   }

   const handleFavoriteClick = (id: string) => {
      const dataset = favorites?.find((el) => el._id === id)
      if (!dataset) return
      const { name, company, department } = dataset
      inputRef.current!.value = name
      if (company) {
         companyRef.current!.value = company
      } else {
         companyRef.current!.value = ''
      }
      if (department) {
         departmentRef.current!.value = department
      } else {
         departmentRef.current!.value = ''
      }

      setFavorites(null)
      setShowFav(false)
   }

   const handleKeyboardEvent = useCallback(
      (e: KeyboardEvent) => {
         if (!showFav) return
         if (favorites && favorites.length === 0) return
         if (e.key !== 'Tab' || e.shiftKey) return
         if (document.activeElement === inputRef.current!) {
            e.preventDefault()
            const firstChild = inputRef.current?.parentElement
               ?.firstElementChild?.firstElementChild as HTMLDivElement
            firstChild.focus()
         }
      },
      [showFav, favorites]
   )

   const handleShowFav = (e: MouseEvent) => {
      if(!showFav) return
      if((e.target as HTMLElement).closest(".fav-container")) return
      setShowFav(false)
      setFavorites(null)

   }

   useEffect(() => {
      document.addEventListener('keydown', handleKeyboardEvent, false)
      return () =>
         document.removeEventListener('keydown', handleKeyboardEvent, false)
   }, [handleKeyboardEvent])
   const [setQuery] = useDebounce(getMyFavorites, 1000)

   useEffect(() => {
      document.addEventListener('click', handleShowFav, false)
      return () => document.removeEventListener('click', handleShowFav, false)
   })


   const handleInput = (e: React.ChangeEvent) => {
      const target = e.target as HTMLInputElement
      setQuery(target.value)
   }

   function EditableControls() {
      const {
         isEditing,
         getSubmitButtonProps,
         getCancelButtonProps,
         getEditButtonProps,
      } = useEditableControls()

      return isEditing ? (
         <ButtonGroup justifyContent='center' size='sm'>
            <IconButton
               aria-label='Confirm Change'
               icon={<CheckIcon />}
               {...getSubmitButtonProps()}
            />
            <IconButton
               aria-label='Cancel Change'
               icon={<CloseIcon />}
               {...getCancelButtonProps()}
            />
         </ButtonGroup>
      ) : (
         <Flex justifyContent='center'>
            <IconButton
               aria-label='Edit title'
               size='sm'
               icon={<EditIcon />}
               {...getEditButtonProps()}
            />
         </Flex>
      )
   }

   const refs = (data ?? [])!.reduce<Array<{ current: HTMLDivElement | null }>>(
      (acc) => {
         acc.push(createRef<HTMLDivElement | null>())
         return acc
      },
      []
   )

   //SAVE________________
   const handleClick = async () => {
      const adjustedTitle = titleRef?.current?.textContent
      const adjustedItems = [] as CollectionItemsInterface[]
      refs.forEach((ref) => {
         const itemObject: CollectionItemsInterface = {
            id: '',
            amount: '',
            department: '',
            company: '',
            name: '',
            completed: false,
         }
         if (ref.current) {
            ([...ref.current.children] ?? []).forEach((child, index) => {
               const value =
                  (child as HTMLInputElement).value ??
                  (child.firstElementChild as HTMLOptionElement)?.value
               if (index === 0) {
                  itemObject.id = ref?.current?.id as string
                  itemObject.completed =
                     ref?.current?.dataset.completed === 'false' ? false : true
               }
               if (index === 1) {
                  itemObject.amount = value
               }
               if (index === 2) {
                  itemObject.amount += ` ${value}`
               }
               if (index === 3) {
                  itemObject.name = value
               }
               if (index === 4) {
                  itemObject.company = value
               }
               if (index === 5) {
                  itemObject.department = value
               }
               if (index > 5) return
            })
         }
         adjustedItems.push(itemObject)
      })
      setError(null)
      setLoading(true)
      try {
         await axios.patch(`/lists/${collectionId}`, {
            data: {
               adjustedTitle,
               adjustedItems,
            },
         })
         setLoading(false)
         navigate(`/dashboard/collections/${collectionId}`)
      } catch (error) {
         setError({
            message: (error as AxiosError).message,
            code: (error as AxiosError).code!,
         })
         setLoading(false)
         console.log((error as AxiosError).message)
      }
   }

   function submitHandler<T extends { currentTarget: HTMLElement }>(e: T) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      e.preventDefault()
      const formDOM = e.currentTarget as HTMLFormElement
      const { data: form, isEmpty } = getFormValues(formDOM)
      if (isEmpty) return
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setData((prev) => [form, ...prev])
      formDOM.reset()
   }

   const handleDelete = async () => {
      if (isDatabaseItemList(loaderData?.list)) {
         const toDeleteId = loaderData?.list?._id
         setError(null)
         setLoading(true)
         try {
            const res = await axios.delete(`/lists/${toDeleteId}`)
            setLoading(false)
            if (res.statusText === 'OK') {
               setRedirectFlag(true)
            }
         } catch (error) {
            setError({
               message: (error as AxiosError).message,
               code: (error as AxiosError).code!,
            })
            setLoading(false)
            console.log(error)
         }
      }
   }

   function handleDeleteItem(id: string) {
      const filteredData = data?.filter((el) => el.id !== id)
      if (filteredData) {
         setData(filteredData)
      } else {
         setData(null)
      }
   }

   function renderItemList({ list }: { list: DatabaseItemListInterface }) {
      if (Object.keys(list).length === 0) return
      const { _id: id, title, type } = list
      return (
         <Flex
            width='min(70rem, calc(100vw - 2rem))'
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={10}
         >
            <Box style={{ width: '100%', padding: '1rem 1.5rem' }}>
               <chakra.header
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  textAlign={'center'}
                  position={'relative'}
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
                     <Editable
                        textAlign='center'
                        defaultValue={title}
                        fontSize='2rem'
                        isPreviewFocusable={false}
                        ref={titleRef}
                     >
                        <EditablePreview />
                        {/* Here is the custom input */}
                        <Input as={EditableInput} />
                        <EditableControls />
                     </Editable>
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
               <Form onSubmit={submitHandler}>
                  <SimpleGrid
                     // width='min(70rem, calc(100vw - 2rem))'
                     gridTemplateColumns={{
                        base: 'repeat(6, 1fr)',
                        md: 'auto auto 1.5fr 1fr 1fr',
                     }}
                     gap='0.5rem'
                     position={'relative'}
                     paddingInline={2}
                     paddingBlock={3}
                     fontSize={{ base: '0.7rem', md: '0.9rem' }}
                     paddingInlineEnd={5}
                  >
                     <NumberInput
                        width={{ base: 'auto', sm: '80px' }}
                        min={1}
                        defaultValue='1'
                        name='amount'
                        id='amount'
                        gridColumn={{
                           base: '1 / 4',
                           sm: '1 / 2',
                           md: 'unset',
                        }}
                     >
                        <NumberInputField />
                        <NumberInputStepper>
                           <NumberIncrementStepper />
                           <NumberDecrementStepper />
                        </NumberInputStepper>
                     </NumberInput>
                     <Select
                        required
                        width={{ base: 'auto', sm: '80px' }}
                        placeholder='Select unit'
                        defaultValue='St.'
                        name='unit'
                        id='unit'
                        gridColumn={{
                           base: '4 / -1',
                           sm: '2 / 3',
                           md: 'unset',
                        }}
                     >
                        <option value='St.'>St.</option>
                        <option value='g'>g</option>
                        <option value='kg'>kg</option>
                        <option value='ml'>ml</option>
                        <option value='l'>l</option>
                     </Select>
                     <Flex
                        gridColumn={{
                           base: '1 / -1',
                           sm: '3 / -1',
                           md: 'unset',
                        }}
                        position={'relative'}
                     >
                        <Flex
                           position='absolute'
                           border='4px solid teal'
                           top='105%'
                           left='0'
                           zIndex='1000'
                           bgColor='white'
                           ref={favRef}
                           className='fav-container'
                           flexDirection={'column'}
                           opacity={showFav ? '1' : '0'}
                        >
                           {favorites && favorites?.length > 0
                              ? favorites.map((fav, index) => {
                                   const { name, _id: id } = fav
                                   const isOdd = index % 2 === 0
                                   return (
                                      <Box
                                         id={id}
                                         key={id}
                                         fontSize={'1.3rem'}
                                         p={'1rem 3rem'}
                                         tabIndex={0}
                                         cursor='pointer'
                                         bgColor={isOdd ? 'teal.100' : 'white'}
                                         onClick={() =>
                                            handleFavoriteClick(id!)
                                         }
                                         onKeyDown={(
                                            e: React.KeyboardEvent
                                         ) => {
                                            if (e.key !== 'Enter') return
                                            handleFavoriteClick(id!)
                                         }}
                                      >
                                         {name}
                                      </Box>
                                   )
                                })
                              : null}
                        </Flex>
                        <Input
                           required
                           name='name'
                           id='name'
                           gridColumn={{
                              base: '1 / -1',
                              sm: '3 / -1',
                              md: 'unset',
                           }}
                           height={{ base: '35px', sm: 'auto' }}
                           size='s'
                           p={1}
                           w={'100%'}
                           placeholder='Select a name'
                           onChange={handleInput}
                           ref={inputRef}
                        ></Input>
                     </Flex>

                     <Input
                        name='company'
                        id='company'
                        gridColumn={{
                           base: 'span 6',
                           sm: '1 / 4',
                           md: 'unset',
                        }}
                        height={{ base: '35px', sm: 'auto' }}
                        size='s'
                        p={1}
                        placeholder='Optional: Select a company'
                        ref={companyRef}
                     ></Input>
                     <Select
                        name='department'
                        id='department'
                        ref={departmentRef}
                        gridColumn={{
                           base: 'span 6',
                           sm: '4 / -1',
                           md: 'unset',
                        }}
                        fontSize={{ base: '0.7rem', md: '0.9rem' }}
                        placeholder='Optional: Select department'
                     >
                        <option value='Groceries'>Groceries</option>
                        <option value='Freezer'>Freezer</option>
                        <option value='Bakery'>Bakery</option>
                        <option value='Household'>Household</option>
                        <option value='Meat'>Meat</option>
                     </Select>
                     <IconButton
                        colorScheme='teal'
                        aria-label='Add Item'
                        icon={<AddIcon />}
                        position='absolute'
                        size='sm'
                        right='-5'
                        top='50%'
                        style={{ translate: '0 -50%' }}
                        type='submit'
                     />
                  </SimpleGrid>
               </Form>
               <chakra.div marginBlock={5}>
                  {(data ?? []).map((item, index) => {
                     const {
                        name,
                        company,
                        department,
                        amount,
                        id,
                        completed,
                     } = item
                     const numericAmount = amount.split(' ')[0]
                     const amountQuality = amount.split(' ')[1]
                     return (
                        <SimpleGrid
                           // width='min(70rem, calc(100vw - 2rem))'
                           gridTemplateColumns={{
                              base: 'repeat(6, 1fr)',
                              md: 'auto auto 1.5fr 1fr 1fr',
                           }}
                           id={id}
                           data-completed={completed}
                           key={id}
                           gap='0.5rem'
                           position={'relative'}
                           paddingInline={2}
                           paddingBlock={3}
                           fontSize={{ base: '0.7rem', md: '0.9rem' }}
                           ref={refs[index]}
                           backgroundColor={`${index % 2 === 0 && 'blue'}.50`}
                           paddingInlineEnd={5}
                           opacity={completed ? '0.3' : '1'}
                           textDecoration={completed ? 'line-through' : 'none'}
                        >
                           <IconButton
                              colorScheme='red'
                              aria-label='Delete Item'
                              icon={<DeleteIcon />}
                              position='absolute'
                              size='sm'
                              right='-5'
                              top='50%'
                              style={{ translate: '0 -50%' }}
                              onClick={() => handleDeleteItem(id)}
                           />
                           <NumberInput
                              width={{ base: 'auto', sm: '80px' }}
                              defaultValue={numericAmount ?? '1'}
                              min={0}
                              gridColumn={{
                                 base: '1 / 4',
                                 sm: '1 / 2',
                                 md: 'unset',
                              }}
                           >
                              <NumberInputField />
                              <NumberInputStepper>
                                 <NumberIncrementStepper />
                                 <NumberDecrementStepper />
                              </NumberInputStepper>
                           </NumberInput>
                           <Select
                              width={{ base: 'auto', sm: '80px' }}
                              placeholder='Select unit'
                              defaultValue={amountQuality ?? 'St.'}
                              gridColumn={{
                                 base: '4 / -1',
                                 sm: '2 / 3',
                                 md: 'unset',
                              }}
                           >
                              <option value='St.'>St.</option>
                              <option value='g'>g</option>
                              <option value='kg'>kg</option>
                              <option value='ml'>ml</option>
                              <option value='l'>l</option>
                           </Select>
                           <Input
                              gridColumn={{
                                 base: '1 / -1',
                                 sm: '3 / -1',
                                 md: 'unset',
                              }}
                              defaultValue={name ?? ''}
                              height={{ base: '35px', sm: 'auto' }}
                              size='s'
                              p={1}
                              placeholder='Select a name'
                           ></Input>
                           <Input
                              gridColumn={{
                                 base: 'span 6',
                                 sm: '1 / 4',
                                 md: 'unset',
                              }}
                              defaultValue={company ?? ''}
                              height={{ base: '35px', sm: 'auto' }}
                              size='s'
                              p={1}
                              placeholder='Optional: Select a company'
                           ></Input>
                           <Select
                              gridColumn={{
                                 base: 'span 6',
                                 sm: '4 / -1',
                                 md: 'unset',
                              }}
                              fontSize={{ base: '0.7rem', md: '0.9rem' }}
                              placeholder='Optional: Select department'
                              defaultValue={department ?? ''}
                           >
                              <option value='Groceries'>Groceries</option>
                              <option value='Freezer'>Freezer</option>
                              <option value='Bakery'>Bakery</option>
                              <option value='Household'>Household</option>
                              <option value='Meat'>Meat</option>
                           </Select>
                        </SimpleGrid>
                     )
                  })}
               </chakra.div>
               <EditButtonControl
                  id={id}
                  handleDelete={handleDelete}
                  handleClick={handleClick}
               />
            </Box>
            {error ? (
               <Alert
                  status='error'
                  position={'fixed'}
                  width='max-content'
                  top={'0.5rem'}
               >
                  <AlertIcon />
                  <AlertTitle>{error.code}</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
               </Alert>
            ) : null}
         </Flex>
      )
   }

   if (loading) {
      return (
         <Flex
            alignItems={'center'}
            justifyContent={'center'}
            marginBlockStart={20}
         >
            <Spinner
               thickness='6px'
               speed='0.65s'
               emptyColor='gray.200'
               color='blue.500'
               size='xl'
            />
         </Flex>
      )
   }

   if (redirectFlag) {
      return <Navigate to='/dashboard/collections' />
   }

   return (
      <Suspense fallback={<SpinnerLoader />}>
         <Await resolve={loaderData}>{renderItemList}</Await>
      </Suspense>
   )
}

export default EditList
