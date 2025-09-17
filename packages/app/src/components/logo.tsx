import { Flex, HStack, Icon, IconProps, Text } from '@chakra-ui/react'
import { PiScribbleLoopBold } from 'react-icons/pi'

export function Logo(props: IconProps) {
  return (
    <Flex gap="2.5" alignItems="center">
      <Icon rotate="-15deg" boxSize="10" {...props} color="fg.warning">
        <PiScribbleLoopBold />
      </Icon>
      <Text fontSize="2xl" fontWeight="bold" mt="1" letterSpacing="wider">
        Laso
      </Text>
    </Flex>
  )
}
