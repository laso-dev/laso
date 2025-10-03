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

export const Route = createFileRoute('/_auth/sign-in')({
  component: RouteComponent,
})

const schema = z.object({
  email: z.email(),
  password: z.string(),
})

function RouteComponent() {
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
      navigate({ to: '/home' })
    }
  })

  return (
    <Stack gap="0" w="full">
      <Text fontWeight="medium">Sign in</Text>
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
          <Text color="fg.muted" fontSize="xs" display="inline-flex" gap="1">
            Already have an account?
            <ChakraLink variant="underline" as={Link} href="/sign-up">
              Sign up
            </ChakraLink>
          </Text>
        </Stack>
      </form>
    </Stack>
  )
}
