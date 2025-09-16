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

const buttonSizes = defaultConfig.theme?.recipes?.button.variants?.size as Record<string, any>
const inputSizes = defaultConfig.theme?.recipes?.input.variants?.size as Record<string, any>
const cardSizes = defaultConfig.theme?.slotRecipes?.card.variants?.size as Record<string, any>

const theme = defineConfig({
  theme: {
    recipes: {
      heading: {
        base: {
          fontWeight: 'medium',
        },
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
        base: {
          fontSize: 'sm',
        },
        variants: {
          size: {
            sm: { fontSize: 'sm' },
            md: { fontSize: 'md' },
            lg: { fontSize: 'lg' },
            xl: { fontSize: 'xl' },
          },
        },
      },
      badge: { base: { borderRadius: 'full' } },
      textarea: {
        base: { borderRadius: '2xl' },
      },
      input: {
        base: { borderRadius: 'full' },
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
        base: { borderRadius: 'none' },
        variants: {
          size: {
            sm: { ...buttonSizes.xs },
            md: { ...buttonSizes.sm },
            lg: { ...buttonSizes.md },
            xl: { ...buttonSizes.lg },
          },
        },
      },
    },
    slotRecipes: {
      actionBar: {
        slots: actionBarAnatomy.keys(),
        base: { content: { borderRadius: 'full' }, selectionTrigger: { borderRadius: 'full' } },
      },
      tabs: {
        slots: tabsAnatomy.keys(),
        variants: {
          variant: {
            plain: {
              list: { borderRadius: '2xl' },
              trigger: { borderRadius: '2xl' },
              indicator: { borderRadius: 'xl' },
            },
            subtle: {
              list: { borderRadius: '2xl' },
              trigger: { borderRadius: '2xl' },
              indicator: { borderRadius: 'xl' },
            },
            enclosed: {
              list: { borderRadius: '3xl' },
              trigger: { borderRadius: '2xl' },
              indicator: { borderRadius: 'xl' },
            },
          },
        },
      },
      select: {
        slots: selectAnatomy.keys(),
        base: {
          trigger: { borderRadius: 'full' },
          content: { borderRadius: '2xl', scrollbarWidth: 'thin' },
          item: { borderRadius: 'xl', px: '3', py: '1.5' },
        },
      },
      card: {
        slots: cardAnatomy.keys(),
        variants: {
          size: {
            sm: { ...cardSizes.sm },
            md: { ...cardSizes.sm },
            lg: { ...cardSizes.md },
            xl: { ...cardSizes.lg },
          },
        },
        base: {
          root: { borderRadius: '2xl', overflow: 'hidden' },
          body: { bg: 'bg.subtle' },
          header: { bg: 'bg.subtle' },
          footer: { bg: 'bg.subtle' },
          title: { fontWeight: 'medium' },
        },
      },
      menu: {
        slots: menuAnatomy.keys(),
        base: { content: { borderRadius: '2xl' }, item: { borderRadius: 'lg' } },
      },
      toast: {
        slots: toastAnatomy.keys(),
        base: {
          root: {
            borderRadius: '2xl',
            bg: 'bg.panel',
            color: 'fg',
            boxShadow: 'md',
            '&[data-type=warning]': {
              bg: 'orange.subtle',
              color: 'orange.fg',
              '--toast-trigger-bg': 'colors.orange.muted',
              '--toast-trigger-bg-hover': 'colors.orange.emphasized',
              '--toast-border-color': 'colors.orange.muted',
            },
            '&[data-type=success]': {
              bg: 'green.subtle',
              color: 'green.fg',
              '--toast-trigger-bg': 'colors.green.muted',
              '--toast-trigger-bg-hover': 'colors.green.emphasized',
              '--toast-border-color': 'colors.green.muted',
            },
            '&[data-type=error]': {
              bg: 'red.subtle',
              color: 'red.fg',
              '--toast-trigger-bg': 'colors.red.muted',
              '--toast-trigger-bg-hover': 'colors.red.emphasized',
              '--toast-border-color': 'colors.red.muted',
            },
            '&[data-type=info]': {
              bg: 'blue.subtle',
              color: 'blue.fg',
              '--toast-trigger-bg': 'colors.blue.muted',
              '--toast-trigger-bg-hover': 'colors.blue.emphasized',
              '--toast-border-color': 'colors.blue.muted',
            },
          },
          actionTrigger: {
            rounded: 'full',
            bg: 'var(--toast-trigger-bg)',
            _hover: {
              bg: 'var(--toast-trigger-bg-hover)',
            },
          },
          title: { color: { _light: 'gray.700', _dark: 'gray.100' } },
          description: { color: { _light: 'gray.600', _dark: 'gray.300' } },
        },
      },
      combobox: {
        slots: comboboxAnatomy.keys(),
        base: {
          input: { borderRadius: 'full', minHeight: '10' },
          content: { borderRadius: '2xl' },
          item: { borderRadius: 'xl', px: '3', py: '1.5' },
        },
      },
      progress: {
        slots: progressAnatomy.keys(),
        // @ts-expect-error types not working here
        defaultVariants: { shape: 'full' },
        base: {
          track: { bg: { _light: 'bg.inverted/10', _dark: 'bg.subtle' } },
          range: { bg: 'brandYellow' },
        },
      },
      progressCircle: {
        slots: progressAnatomy.keys(),
        variants: {
          size: {
            xs: { circle: { '--size': '18px', '--thickness': '4px' } },
          },
        },
      },
      nativeSelect: {
        slots: nativeSelectAnatomy.keys(),
        base: {
          field: { borderRadius: 'full' },
        },
      },
      popover: {
        slots: popoverAnatomy.keys(),
        base: {
          header: { pt: 3 },
          body: { pt: 2 },
          content: {
            borderRadius: '2xl',
            border: '1px solid',
            borderColor: 'border.muted',
            shadow: 'sm',
          },
        },
      },
      numberInput: {
        slots: numberInputAnatomy.keys(),
        base: {
          input: { borderRadius: 'full' },
          decrementTrigger: { borderBottomRightRadius: 'full', pr: 1 },
          incrementTrigger: { borderTopRightRadius: 'full', pr: '1' },
        },
      },
      checkbox: {
        slots: checkboxAnatomy.keys(),
        base: {
          control: { rounded: 'md' },
        },
      },
      radioCard: {
        slots: radioCardAnatomy.keys(),
        base: { item: { rounded: '2xl' } },
      },
      segmentGroup: {
        slots: segmentGroupAnatomy.keys(),
        base: {
          root: { rounded: '2xl' },
          indicator: { rounded: '2xl', shadow: 'sm' },
        },
      },
      alert: {
        slots: alertAnatomy.keys(),
        base: {
          root: { rounded: '2xl' },
        },
      },
      table: {
        slots: tableAnatomy.keys(),
        base: {
          root: { rounded: '2xl' },
          cell: {
            px: 4,
            py: 3,
            fontWeight: 'normal',
            _first: { pl: 4 },
            _last: { pr: 4 },
          },
          row: { bg: 'transparent' },
          header: { bg: 'bg.muted' },
          columnHeader: {
            bg: 'transparent',
            fontWeight: 'medium',
            color: 'fg.muted',
            fontSize: '12px',
            _first: { pl: 4, roundedLeft: 'xl' },
            _last: { pr: 4, roundedRight: 'xl' },
          },
        },
        defaultVariants: {
          // @ts-ignore
          variant: 'unstyled',
        },
      },
      timeline: {
        slots: timelineAnatomy.keys(),
        variants: {
          variant: {
            outline: {
              indicator: {
                bg: 'bg',
              },
            },
          },
        },
      },
      dataList: {
        slots: dataListAnatomy.keys(),
        base: {
          itemValue: {
            color: 'fg.muted',
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          subtle: {
            value: {
              _light: '{colors.gray.50}',
              _dark: '#151515',
            },
          },
        },
        brandYellow: {
          value: {
            _light: '#EDFC33',
            _dark: '#EDFC33',
          },
        },
        brand: {
          value: {
            _light: '#91b5c9',
            _dark: '#EDFC33',
          },
        },
      },
    },
    tokens: {
      colors: {},
    },
  },
})

export const system = createSystem(defaultConfig, theme)
