import { Button, Link as ChakraLink, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Field } from '../components/ui/field'
import { PasswordInput } from '../components/ui/password-input'
import { toaster } from '../components/ui/toaster'
import { authClient } from '../lib/auth/client'

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
})

const schema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string(),
})

function RouteComponent() {
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
      navigate({ to: '/dashboard' })
    }
  })

  return (
    <Stack gap="0" w="full">
      <Text fontWeight="medium">Sign up</Text>
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
          <Text color="fg.muted" fontSize="xs" display="inline-flex" gap="1">
            Already have an account?
            <ChakraLink variant="underline" as={Link} href="/sign-in">
              Sign in
            </ChakraLink>
          </Text>
        </Stack>
      </form>
    </Stack>
  )
}
