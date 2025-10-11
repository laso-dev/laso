import { Box, Button, Flex, HStack, Span, Stack } from '@chakra-ui/react'
import { createFileRoute, Outlet, redirect, useLocation, useNavigate } from '@tanstack/react-router'
import { Logo } from '../components/logo'
import { authClient } from '../lib/auth/client'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession()

    if (!data?.session || error) {
      throw redirect({ to: '/sign-in' })
    }
  },
})

const menus = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Instances', href: '/instances' },
  { label: 'Alerts', href: '/alerts' },
  { label: 'Settings', href: '/settings' },
]

function RouteComponent() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Stack gap="0" h="full">
      <Flex px="4" h="12" borderBottomWidth="1px" borderColor="border.emphasized/40" bg="bg.panel">
        <Logo textProps={{ hidden: true }} px="2" />

        <HStack gap="0">
          {menus.map((menu) => {
            const isActive = location.pathname.startsWith(menu.href)

            return (
              <Button
                fontFamily="mono"
                px="3"
                h="full"
                key={menu.label}
                variant="ghost"
                size="sm"
                pos="relative"
                mb="-0.5"
                onClick={() => {
                  navigate({ to: menu.href })
                }}
              >
                {isActive && (
                  <Span
                    bg="bg.inverted/70"
                    w="full"
                    h="0.5"
                    pos="absolute"
                    bottom="-1px"
                    left="0"
                  ></Span>
                )}
                {menu.label}
              </Button>
            )
          })}
        </HStack>
      </Flex>

      <Outlet />
    </Stack>
  )
}
