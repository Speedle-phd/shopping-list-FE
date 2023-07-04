import { Button, Flex, FormControl, Link, FormLabel, Input, Select } from "@chakra-ui/react"
import { Form, Link as ReactLink, useLocation, useSubmit } from "react-router-dom"

interface FavoritesFormProps {
   name?: string
   company?: string
   createdBy?: string
   department?: string
   _id?: string

}

const FavoritesForm = ({name, company, department}: FavoritesFormProps) => {
   const location = useLocation()
   const isEdit = location.pathname.endsWith("favorites")
   const submit = useSubmit()
   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      submit(e.currentTarget.form)
      e.currentTarget.form!.reset()
   }


   return (
      <Form method='POST' style={{ width: '100%' }}>
         <Flex
            flexDirection={'column'}
            
            gap='1rem'
            w={isEdit ? { base: '100%', md: '80%' } : {base: "100%"}}
         >
            <FormControl>
               <FormLabel>Name</FormLabel>
               <Input name='name' defaultValue={name ?? ''} required />
            </FormControl>
            <FormControl>
               <FormLabel>Company</FormLabel>
               <Input
                  name='company'
                  placeholder='Optional...'
                  defaultValue={company ?? ''}
               />
            </FormControl>
            <FormControl>
               <FormLabel>Department</FormLabel>
               <Select
                  name='department'
                  placeholder='Optional...'
                  defaultValue={department ?? ''}
               >
                  <option value='Groceries'>Groceries</option>
                  <option value='Freezer'>Freezer</option>
                  <option value='Bakery'>Bakery</option>
                  <option value='Household'>Household</option>
                  <option value='Meat'>Meat</option>
               </Select>
            </FormControl>
            <Button onClick={handleSubmit} colorScheme='teal' type='submit'>
               {!isEdit ? "Confirm your Changes" : "Add a new Item"}
            </Button>
            {!isEdit ? <Link marginBlockStart="1rem" as={ReactLink} to="/dashboard/favorites"><Button w="100%" bgColor="yellow.200">Cancel</Button></Link> : null}
         </Flex>
      </Form>
   )
}

export default FavoritesForm
