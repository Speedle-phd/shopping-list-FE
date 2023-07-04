import { AlertIcon, Alert } from "@chakra-ui/react"


export type ErrorProps = {
   msg: string
   statuscode: number
}

const CustomAlert = ({ msg, statuscode }: ErrorProps) => {
   return (
      <Alert
         position={'absolute'}
         top='5px'
         left='50%'
         transform={'translate(-50%,-50%)'}
         w={'max-content'}
         marginInline='auto'
         borderRadius={10}
         mt={5}
         status='error'
         variant={'solid'}
      >
         <AlertIcon />
         {(statuscode ?? "Error") + ': ' + msg.split(",").join(" and ")}
      </Alert>
   )
}

export default CustomAlert
