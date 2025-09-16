import { Button, Flex, Heading, Link, PinInput, Span, Stack, Text, VStack } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'
import { authClient } from '../../lib/auth'
import { useMutation } from '@tanstack/react-query'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { trpc } from '../../lib/trpc'
import { toaster } from '../../components/ui/toaster'
import { Logo } from '../../components/logo'

export default function () {
  const state = useLocation().state as { email: string; type: 'sign-in' }

  const form = useForm()
  const navigate = useNavigate()

  const checkEmail = trpc.auth.exists.useMutation()

  const verifySignUp = useMutation({
    mutationFn: async (otp: string) => {
      const { data, error } = await authClient.signIn.emailOtp({ otp, email: state.email })
      if (error) throw error
      return data
    },
  })

  const verifySignIn = useMutation({
    mutationFn: async (otp: string) => {
      const { data, error } = await authClient.emailOtp.verifyEmail({ otp, email: state.email })
      if (error) throw error
      return data
    },
  })

  const sendVerification = useMutation({
    mutationFn: async (input: { email: string; type: 'sign-in' | 'email-verification' }) => {
      const { error, data } = await authClient.emailOtp.sendVerificationOtp({ ...input })
      if (error) throw error
      return data
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const exists = await checkEmail.mutateAsync({ email: state.email })

    if (exists === true) {
      await verifySignIn.mutateAsync(data.otp)
    } else if (exists === false) {
      await verifySignUp.mutateAsync(data.otp)
    } else {
      toaster.error({ title: 'Something went wrong', description: 'Please try again' })
    }

    navigate('/')
  })

  const resendCode = async () => {
    const exists = await checkEmail.mutateAsync({ email: state.email })

    if (exists === true) {
      await sendVerification.mutateAsync({ email: state.email, type: 'email-verification' })
    } else if (exists === false) {
      await sendVerification.mutateAsync({ email: state.email, type: 'sign-in' })
    } else {
      toaster.error({ title: 'Something went wrong', description: 'Please try again' })
    }
  }

  if (!state?.email || !state?.type) return <Navigate to="/sign-up" />

  return (
    <Flex alignItems="center" maxW="md" mx="auto" py={{ base: '8', md: '12' }} h="full" px="8">
      <Stack gap="0" w="full">
        <Logo />
        <form onSubmit={onSubmit}>
          <Stack gap="4" mt="6">
            <Stack gap={{ base: '2', md: '3' }}>
              <Text fontSize="lg" fontWeight="medium">
                Enter code
              </Text>
            </Stack>

            <VStack gap="4">
              <PinInput.Root
                size="lg"
                placeholder=""
                onValueChange={(value) => {
                  form.setValue('otp', value.valueAsString)
                }}
              >
                <PinInput.HiddenInput />
                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                  <PinInput.Input index={4} />
                  <PinInput.Input index={5} />
                </PinInput.Control>
              </PinInput.Root>
            </VStack>

            <Button type="submit" size="sm">
              Continue
            </Button>
            <Text fontSize="xs" color="fg.muted">
              Didn't receive the code?{' '}
              <Link
                variant="underline"
                onClick={() => {
                  resendCode()
                }}
              >
                {verifySignUp.isPending ? 'Sending...' : 'Resend it'}
              </Link>
            </Text>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}
