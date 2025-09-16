import {
  Button,
  Container,
  Heading,
  Link,
  PinInput,
  Span,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'
import { authClient } from '../../lib/auth'
import { useMutation } from '@tanstack/react-query'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

export default function () {
  const state = useLocation().state as { email: string; type: 'sign-in' }

  const form = useForm()
  const navigate = useNavigate()

  const verifyOTP = useMutation({
    mutationFn: (otp: string) => {
      return authClient.signIn.emailOtp({ otp, email: state.email })
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await verifyOTP.mutateAsync(data.otp)

    navigate('/')
  })

  if (!state?.email || !state?.type) return <Navigate to="/sign-up" />

  console.log(form.watch())

  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <form onSubmit={onSubmit}>
        <Stack gap="8">
          <Stack gap={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: '2xl', md: '3xl' }}>Confirm your email</Heading>
            <Text color="fg.muted">
              We sent a code to your email address{' '}
              <Span color="fg" fontWeight="medium">
                {state.email}
              </Span>
            </Text>
          </Stack>

          <VStack gap="6">
            <PinInput.Root
              size="xl"
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
            <Text textStyle="sm" color="fg.muted" textAlign="center">
              Didn't receive the code?{' '}
              <Link
                variant="underline"
                href="#"
                onClick={() => {
                  verifyOTP.mutateAsync(form.getValues('otp'))
                }}
              >
                {verifyOTP.isPending ? 'Sending...' : 'Resend it'}
              </Link>
              <Link
                variant="underline"
                href="#"
                onClick={() => {
                  verifyOTP.mutateAsync(form.getValues('otp'))
                }}
              >
                {verifyOTP.isPending ? 'Sending...' : 'Resend it'}
              </Link>
            </Text>
          </VStack>

          <Button type="submit">
            Continue <LuArrowRight />
          </Button>
        </Stack>
      </form>
    </Container>
  )
}
