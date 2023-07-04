import { Badge, Card, CardBody, CardFooter, CardHeader, CircularProgress, CircularProgressLabel, Flex, Heading, Text, useToken } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


export type DashBoardCardProps = {
   title?: string
   createdAt?: Date
   progress?: number
   type: string
   _id?: number
}

const DashboardCard = ({_id, title, type, progress, createdAt}:DashBoardCardProps ) => {
   const [blue100] = useToken('colors', ['blue.100'])
   const color = type === "home" ? 'teal' : type === "food" ? 'blue' : type === "misc" ? 'yellow' : "gray"

   if(!title && !progress && !createdAt && !_id){
      return (
         <Card
            maxW={'30rem'}
            boxShadow={
               'inset 0 0 7px 4px rgba(255,255,255,0.7), inset 0 0 15px 8px rgba(255,255,255,0.4)'
            }
            border={`1px solid ${blue100}`}
            overflow='hidden'
            rounded='md'
            background='rgba(255,255,255,0.7)'
            marginBlock='0.5rem'
            w='100%'
            height='460px'
            display='flex'
            justifyContent={'center'}
            alignItems={'center'}
            position={'relative'}
            _after={{
               content: "'fefef'",
               filter: 'blur(10px)',
               inset: '0',
               background: `${color}.200`,
               zIndex: '-1',
               position: 'absolute',
            }}
         >
            {' '}
            <Badge
               position='absolute'
               top='15px'
               right='15px'
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
            <CardBody
               minH={{ base: '210px', md: '420px' }}
               display='flex'
               justifyContent={'center'}
               alignItems={'center'}
            >
               <Text fontWeight={600}>No Data Yet.</Text>
            </CardBody>
         </Card>
      )
   }

   return (
      <Card
         maxW={'30rem'}
         minH={{ base: '210px', md: '420px' }}
         boxShadow={
            'inset 0 0 7px 4px rgba(255,255,255,0.7), inset 0 0 15px 8px rgba(255,255,255,0.4)'
         }
         border={`1px solid ${blue100}`}
         overflow='hidden'
         rounded='md'
         background='rgba(255,255,255,0.7)'
         marginBlock='0.5rem'
         w='100%'
         height='460px'
         display='flex'
         justifyContent={'center'}
         alignItems={'center'}
         position={'relative'}
         _after={{
            content: "'fefef'",
            filter: 'blur(10px)',
            inset: '0',
            background: `${color}.200`,
            zIndex: '-1',
            position: 'absolute',
         }}
      >
         <CardHeader>
            <Heading>{title}</Heading>
            <Badge
               position='absolute'
               top='15px'
               right='15px'
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
         </CardHeader>
         <CardBody>
            <CircularProgress
               value={progress}
               color={`${color}.200`}
               thickness={10}
               size='200px'
            >
               <CircularProgressLabel>{progress?.toFixed(0)}%</CircularProgressLabel>
            </CircularProgress>
         </CardBody>
         <CardFooter
            w='100%'
            fontWeight='600'
            display='flex'
            justifyContent={'space-between'}
            alignItems={'flex-end'}
            textTransform={'uppercase'}
         >
            <Link to={`/dashboard/collections/${_id?.toString()}`}>
               view list
            </Link>
            <Flex color='rgba(0,0,0,.5)' direction={'column'}>
               <Text textTransform={'none'}>Created at:</Text>
               <Text>
                  {new Date(createdAt as Date)?.toLocaleDateString('de-DE', {
                     day: '2-digit',
                     month: '2-digit',
                     year: 'numeric',
                  })}
               </Text>
            </Flex>
         </CardFooter>
      </Card>
   )
}
export default DashboardCard
