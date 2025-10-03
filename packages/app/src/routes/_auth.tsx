import { Card, Flex, Stack } from '@chakra-ui/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Logo } from '../components/logo'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex
      h="full"
      bg="bg.subtle"
      css={{
        '&::before': {
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          opacity: 0.05,
          backgroundImage: 'url(/noise.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
          zIndex: 0,
        },
      }}
    >
      <Stack w="md" m="auto">
        <Flex alignItems="start" justifyContent="start">
          <Logo />
        </Flex>
        <Card.Root w="full" position="relative" zIndex={1} mx="auto">
          <Card.Body gap="8">
            <Outlet />
          </Card.Body>
        </Card.Root>
      </Stack>
    </Flex>
  )
}
