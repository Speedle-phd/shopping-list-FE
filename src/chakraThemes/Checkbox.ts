import { checkboxAnatomy as parts } from '@chakra-ui/anatomy'
import {
   createMultiStyleConfigHelpers,
   defineStyle,
} from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
   createMultiStyleConfigHelpers(parts.keys)

// Defining a custom variant
const noneDisplay = definePartsStyle({
   icon: defineStyle({
      display: 'none',
   }),
   control: defineStyle({
      display: 'none',
   }),
})

const variants = {
   hidden: noneDisplay,
}


export const checkboxTheme = defineMultiStyleConfig({
   variants,
})
