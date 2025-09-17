import { Button, Link as ChakraLink, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod/v4'
import { Logo } from '../../components/logo'
import { Field } from '../../components/ui/field'
import { PasswordInput } from '../../components/ui/password-input'
import { toaster } from '../../components/ui/toaster'
import { authClient } from '../../lib/auth'
import { useNavigate } from '../../router'

const schema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string(),
})

export default function () {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: `test+${Date.now()}@test.com`,
      name: 'Test',
      password: 'password',
    },
  })
  const navigate = useNavigate()

  const signUp = useMutation({
    mutationFn: async (input: { email: string; name: string; password: string }) =>
      authClient.signUp.email(input),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await signUp.mutateAsync(data)
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
          Sign up
        </Text>
        <Text color="fg.muted">Create an account to get started</Text>
        <form onSubmit={onSubmit}>
          <Stack gap="4" mt="6">
            <Field label="Name">
              <Input {...form.register('name')} />
            </Field>
            <Field label="Email">
              <Input {...form.register('email')} />
            </Field>
            <Field label="Password">
              <PasswordInput {...form.register('password')} />
            </Field>
            <Button type="submit" loading={signUp.isPending}>
              Create account
            </Button>
            <Text color="fg.muted" fontSize="xs">
              Already have an account? {/* @ts-ignore */}
              <ChakraLink variant="underline" as={Link} to="/sign-in">
                Sign in
              </ChakraLink>
            </Text>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}
