import { Flex, HStack, Icon, IconProps, Text, TextProps } from '@chakra-ui/react'
import { PiScribbleLoopBold } from 'react-icons/pi'

export type LogoProps = {
  iconProps?: IconProps
  textProps?: TextProps
}

export function Logo(props: LogoProps) {
  const { iconProps, textProps } = props

  return (
    <Flex gap="2.5" alignItems="center">
      <Icon rotate="-15deg" boxSize="10" {...iconProps} color="fg.warning">
        <PiScribbleLoopBold />
      </Icon>
      <Text fontSize="2xl" fontWeight="bold" mt="1" letterSpacing="wider" {...textProps}>
        Laso
      </Text>
    </Flex>
  )
}
