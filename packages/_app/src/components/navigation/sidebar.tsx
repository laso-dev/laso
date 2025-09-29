import { Bleed, Stack, type StackProps, Text } from '@chakra-ui/react'
import {
  LuBell,
  LuFileText,
  LuLayoutDashboard,
  LuLogs,
  LuSettings
} from 'react-icons/lu'
import { Logo } from './../logo'
import { SidebarLink } from './sidebar-link'
import { UserProfile } from './user-profile'

const groups = [
  {
    title: 'Monitor',
    links: [
      { icon: LuLayoutDashboard, label: 'Dashboard' },
      { icon: LuLogs, label: 'Jobs' },
    ],
  },
  {
    title: 'Manage',
    links: [
      { icon: LuFileText, label: 'Instances' },
      { icon: LuBell, label: 'Alerts' },
      { icon: LuSettings, label: 'Settings' },
    ],
  },
]

export const Sidebar = (props: StackProps) => {
  return (
    <Stack
      flex="1"
      p={{ base: '4', md: '6' }}
      bg="bg.subtle"
      justifyContent="space-between"
      maxW="200px"
      h="full"
      {...props}
    >
      <Stack gap="6">
        <Logo textProps={{ hidden: true }} iconProps={{ w: '8' }} />
        <Stack gap="6">
          {groups.map((group, index) => (
            <Stack key={index} gap="2">
              <Text fontWeight="medium" textStyle="xs" fontFamily="mono" color="fg.subtle">
                {group.title}
              </Text>
              <Stack gap="1">
                {group.links.map((link, index) => (
                  <Bleed key={index} inline="2">
                    <SidebarLink aria-current={link.label === 'Analysis' ? 'page' : undefined}>
                      <link.icon /> {link.label}
                    </SidebarLink>
                  </Bleed>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <UserProfile />
    </Stack>
  )
}
