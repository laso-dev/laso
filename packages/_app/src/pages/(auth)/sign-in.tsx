import { Button, Link as ChakraLink, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { Logo } from '../../components/logo'
import { Field } from '../../components/ui/field'
import { authClient } from '../../lib/auth'
import { useNavigate } from '../../router'
import z from 'zod/v4'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput } from '../../components/ui/password-input'
import { toaster } from '../../components/ui/toaster'

const schema = z.object({
  email: z.email(),
  password: z.string(),
})

export default function () {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: `test+${Date.now()}@test.com`,
      password: 'password',
    },
  })
  const navigate = useNavigate()

  const signIn = useMutation({
    mutationFn: async (input: { email: string; password: string }) =>
      authClient.signIn.email(input),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await signIn.mutateAsync(data)

    if (error) {
      toaster.error({ title: error.message || 'Something went wrong' })
    } else {
      navigate('/')
    }
  })

  return (
    <Flex alignItems="center" maxW="md" mx="auto" py={{ base: '8', md: '12' }} h="full" px="8">
      <Stack gap="0" w="full">
        <Logo />
        <Text as="h1" fontWeight="medium" mt="8" fontSize="lg">
          Sign in
        </Text>
        <Text color="fg.muted">Welcome back</Text>
        <form onSubmit={onSubmit}>
          <Stack gap="4" mt="6">
            <Field label="Email">
              <Input {...form.register('email')} />
            </Field>
            <Field label="Password">
              <PasswordInput {...form.register('password')} />
            </Field>
            <Button type="submit" loading={signIn.isPending}>
              Sign in
            </Button>
            <Text color="fg.muted" fontSize="xs">
              Already have an account? {/* @ts-ignore */}
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
