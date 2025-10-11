import { Flex, FlexProps, Icon, IconProps, Text, TextProps } from '@chakra-ui/react'
import { PiScribbleLoopBold } from 'react-icons/pi'

export type LogoProps = {
  iconProps?: IconProps
  textProps?: TextProps
  size?: 'sm' | 'md' | 'lg'
} & FlexProps

const sizeMap = {
  sm: { icon: 5, text: 'md', gap: 1.5 },
  md: { icon: 7, text: 'lg', gap: 2 },
  lg: { icon: 10, text: '2xl', gap: 2.5 },
}

export function Logo(props: LogoProps) {
  const { iconProps, textProps, size = 'md', ...rest } = props
  const { icon, text, gap } = sizeMap[size]

  return (
    <Flex gap={gap} alignItems="center" {...rest}>
      <Icon rotate="-15deg" boxSize={icon} {...iconProps} color="fg.warning">
        <PiScribbleLoopBold />
      </Icon>
      <Text fontSize={text} fontWeight="bold" mt="1" letterSpacing="wider" {...textProps}>
        Laso
      </Text>
    </Flex>
  )
}
