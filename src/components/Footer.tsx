import { Flex, useToken } from "@chakra-ui/react"

const Footer = () => {
  const [blue100, blue200] = useToken("colors", ['blue.100', 'blue.200'])
  return (
    <Flex 
    p="2rem 1rem" 
    justifyContent={"center"} 
    background={"blue.800"} 
    color="whiteAlpha.900"
    borderRadius={"15px 15px 0 0"}
    boxShadow={`0 0 10px 2px ${blue200}, 0 0 20px 5px ${blue100}`}
    >
      #PurchaseWithPanda &copy; {new Date().getFullYear()}
    </Flex>
  )
}

export default Footer
