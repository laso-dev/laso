import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { cardAnatomy } from '@chakra-ui/react/anatomy'

const buttonSizes = defaultConfig.theme?.recipes?.button.variants?.size as Record<string, any>
const inputSizes = defaultConfig.theme?.recipes?.input.variants?.size as Record<string, any>

const theme = defineConfig({
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
      },

      input: {
        base: { rounded: 'none' },
        variants: {
          size: {
            sm: { ...inputSizes['2xs'] },
            md: { ...inputSizes.xs },
            lg: { ...inputSizes.sm },
            xl: { ...inputSizes.md },
          },
        },
      },
      button: {
        base: { rounded: 'sm' },
        variants: {
          size: {
            sm: { ...buttonSizes['2xs'] },
            md: { ...buttonSizes['xs'] },
            lg: { ...buttonSizes.md },
            xl: { ...buttonSizes.lg },
          },
        },
      },
    },
    slotRecipes: {
      card: {
        slots: cardAnatomy.keys(),
        base: {
          root: {
            borderRadius: '0',
          },
        },
      },
    },
    semanticTokens: {
      colors: {},
    },
    tokens: {
      colors: {},
    },
  },
})

export const system = createSystem(defaultConfig, theme)
