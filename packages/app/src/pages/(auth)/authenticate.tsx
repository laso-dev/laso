import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Logo } from '../../components/logo'
import { Field } from '../../components/ui/field'
import { authClient } from '../../lib/auth'
import { useNavigate } from '../../router'
import { trpc } from '../../lib/trpc'
import { toaster } from '../../components/ui/toaster'

export default function () {
  const form = useForm()
  const navigate = useNavigate()

  const checkEmail = trpc.auth.exists.useMutation()

  const sendVerification = useMutation({
    mutationFn: async (input: { email: string; type: 'sign-in' | 'email-verification' }) => {
      const { error, data } = await authClient.emailOtp.sendVerificationOtp({ ...input })
      if (error) throw error
      return data
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const exists = await checkEmail.mutateAsync({ email: data.email })

    if (exists === true) {
      await sendVerification.mutateAsync({ email: data.email, type: 'email-verification' })
    } else if (exists === false) {
      await sendVerification.mutateAsync({ email: data.email, type: 'sign-in' })
    } else {
      toaster.error({ title: 'Something went wrong', description: 'Please try again' })
    }

    navigate('/verify', {
      state: {
        email: data.email,
        type: 'sign-in',
        signUp: true,
      },
    })
  })

  return (
    <Flex
      fontFamily="mono"
      alignItems="center"
      maxW="md"
      mx="auto"
      py={{ base: '8', md: '12' }}
      h="full"
      px="8"
    >
      <Stack gap="0" w="full">
        <Logo />
        <form onSubmit={onSubmit}>
          <Stack gap="4" mt="6">
            <Field label="Email">
              <Input placeholder="name@company.com" {...form.register('email')} />
            </Field>
            <Button type="submit" size="sm">
              Continue
            </Button>
            <Text color="fg.muted" fontSize="xs">
              New to Laso? Just enter your email. We will create an account for you.
            </Text>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}
