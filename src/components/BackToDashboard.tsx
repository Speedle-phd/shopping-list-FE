import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const BackToDashboard = () => {
   return (
      <Link tabIndex={-1} to='/dashboard'>
         <Button
            _hover={{ background: 'blue.300' }}
            _focusVisible={{ background: 'blue.300' }}
            transition='0.5s ease-in-out'
            background='gray.200'
         >
            Back to dashboard
         </Button>
      </Link>
   )
}

export default BackToDashboard
