import { Button, Container, Heading, Input, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { authClient } from '../../lib/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '../../router'

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
    <Container
      maxW="md"
      py={{ base: '12', md: '24' }}
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack gap="6" w="full">
        <Heading as="h1" size="lg">
          Laso
        </Heading>
        <form onSubmit={onSubmit}>
          <Stack gap="4">
            <Input placeholder="name@company.com" {...form.register('email')} />
            <Button type="submit" size="sm">
              Continue with email
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}
