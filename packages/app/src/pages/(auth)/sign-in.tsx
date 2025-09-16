import { Button, Link as ChakraLink, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { authClient } from '../../lib/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '../../router'
import { Logo } from '../../components/logo'
import { Link } from 'react-router'

export default function () {
  const form = useForm()
  const navigate = useNavigate()

  const sendVerificationOTP = useMutation({
    mutationFn: (email: string) => {
      return authClient.emailOtp.sendVerificationOtp({ email, type: 'sign-in' })
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await sendVerificationOTP.mutateAsync(data.email)

    navigate('/verify', {
      state: {
        email: data.email,
        type: 'sign-in',
      },
    })
  })

  return (
    <Flex alignItems="center" maxW="md" mx="auto" py={{ base: '8', md: '12' }} h="full" px="8">
      <Stack gap="2" w="full">
        <Logo />
        <Text as="h1" fontSize="lg" fontWeight="medium" mt="8">
          Sign in
        </Text>
        <Text color="fg.muted" fontSize="sm">
          Sign in to your account
        </Text>
        <form onSubmit={onSubmit}>
          <Stack gap="4">
            <Input placeholder="name@company.com" {...form.register('email')} />
            <Button type="submit" size="sm">
              Sign in
            </Button>
            <Text color="fg.muted">
              Don't have an account? {/* @ts-ignore */}
              <ChakraLink variant="underline" as={Link} to="/sign-up">
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}
