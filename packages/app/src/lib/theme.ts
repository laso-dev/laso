import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import {
  actionBarAnatomy,
  alertAnatomy,
  cardAnatomy,
  checkboxAnatomy,
  comboboxAnatomy,
  dataListAnatomy,
  menuAnatomy,
  nativeSelectAnatomy,
  numberInputAnatomy,
  popoverAnatomy,
  progressAnatomy,
  radioCardAnatomy,
  segmentGroupAnatomy,
  selectAnatomy,
  tableAnatomy,
  tabsAnatomy,
  timelineAnatomy,
  toastAnatomy,
} from '@chakra-ui/react/anatomy'

import { defineTextStyles } from '@chakra-ui/react'

const buttonSizes = defaultConfig.theme?.recipes?.button.variants?.size as Record<string, any>
const inputSizes = defaultConfig.theme?.recipes?.input.variants?.size as Record<string, any>
const cardSizes = defaultConfig.theme?.slotRecipes?.card.variants?.size as Record<string, any>
const theme = defineConfig({
  globalCss: {
    '*': {
      fontFamily: `'JetBrains Mono Variable', monospace !important`,
    },
    'body, #root': {
      height: '100vh',
    },
  },
  theme: {
    recipes: {
      heading: {
        base: { fontWeight: 'medium' },
        variants: {
          size: {
            sm: { fontSize: 'sm', fontWeight: 'medium', mb: '3.5' },
            md: { fontSize: 'md', fontWeight: 'medium', lineHeight: '1.25rem', mb: '4' },
            lg: { fontSize: 'lg', fontWeight: 'medium', lineHeight: '1.5rem', mb: '4' },
            xl: { fontSize: 'xl', fontWeight: 'medium', lineHeight: '1.75rem', mb: '4' },
          },
        },
      },
      text: {
        base: { fontSize: 'sm' },
        variants: {
          size: {
            sm: { fontSize: 'sm' },
            md: { fontSize: 'md' },
            lg: { fontSize: 'lg' },
            xl: { fontSize: 'xl' },
          },
        },
      },

      input: {
        variants: {
          size: {
            sm: { ...inputSizes.xs },
            md: { ...inputSizes.sm },
            lg: { ...inputSizes.md },
            xl: { ...inputSizes.lg },
          },
        },
      },
      button: {
        variants: {
          size: {
            xs: { ...buttonSizes['2xs'] },
            sm: { ...buttonSizes.xs },
            md: { ...buttonSizes.sm },
            lg: { ...buttonSizes.md },
            xl: { ...buttonSizes.lg },
          },
        },
      },
    },
    slotRecipes: {},
    semanticTokens: {
      colors: {},
    },
    tokens: {
      colors: {},
    },
  },
})

export const system = createSystem(defaultConfig, theme)
