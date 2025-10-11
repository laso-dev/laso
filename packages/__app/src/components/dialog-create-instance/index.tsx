import { Button, Input, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createServerFn } from '@tanstack/react-start'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { authMiddleware } from '../../lib/auth/middleware'
import { db } from '../../lib/db'
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Field } from '../ui/field'
import { NativeSelectField, NativeSelectRoot } from '../ui/native-select'
import { PasswordInput } from '../ui/password-input'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  host: z.string().min(1, 'Host is required'),
  port: z.number().int().min(1).max(65535),
  database: z.number().int().min(0),
  username: z.string().optional(),
  password: z.string().optional(),
  tls: z.boolean(),
  tlsProfile: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const createInstance = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(schema)
  .handler(async ({ context, data }) => {
    const orgId = context.organization?.id

    await db
      .insertInto('instances')
      .values({
        name: data.name,
        organization_id: orgId,
        connection: JSON.stringify(data),
      })
      .execute()
  })

export function CreateInstanceDialog(props: { children: React.ReactNode }) {
  const { children } = props

  const { open, setOpen } = useDisclosure()

  const qc = useQueryClient()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      host: '',
      port: 6379,
      database: 0,
      username: '',
      password: '',
      tls: false,
      tlsProfile: '',
    },
  })

  const create = useMutation({ mutationFn: createInstance })

  const onSubmit = form.handleSubmit(async (data) => {
    await create.mutateAsync({ data })
    await qc.invalidateQueries({ queryKey: ['instances'] })
    form.reset()
    setOpen(false)
  })

  return (
    <DialogRoot open={open} onOpenChange={(details) => setOpen(details.open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader as={Stack} gap="1">
          <DialogTitle>New instance</DialogTitle>
          <Text fontSize="sm" color="fg.muted">
            Connect to your Redis instance
          </Text>
        </DialogHeader>
        <DialogBody>
          <form id="create-instance-form" onSubmit={onSubmit}>
            <Stack gap="3.5">
              <Field
                label="Name"
                required
                invalid={!!form.formState.errors.name}
                errorText={form.formState.errors.name?.message}
              >
                <Input {...form.register('name')} />
              </Field>

              <Field
                label="Host"
                required
                invalid={!!form.formState.errors.host}
                errorText={form.formState.errors.host?.message}
              >
                <Input {...form.register('host')} />
              </Field>

              <Field
                label="Port"
                invalid={!!form.formState.errors.port}
                errorText={form.formState.errors.port?.message}
              >
                <Input type="number" {...form.register('port', { valueAsNumber: true })} />
              </Field>

              <Field
                label="Database"
                invalid={!!form.formState.errors.database}
                errorText={form.formState.errors.database?.message}
              >
                <NativeSelectRoot>
                  <NativeSelectField
                    {...form.register('database', { valueAsNumber: true })}
                    items={Array.from({ length: 16 }, (_, i) => ({
                      label: i.toString(),
                      value: i.toString(),
                    }))}
                  />
                </NativeSelectRoot>
              </Field>

              <Field
                label="Username"
                invalid={!!form.formState.errors.username}
                errorText={form.formState.errors.username?.message}
              >
                <Input {...form.register('username')} />
              </Field>

              <Field
                label="Password"
                invalid={!!form.formState.errors.password}
                errorText={form.formState.errors.password?.message}
              >
                <PasswordInput {...form.register('password')} />
              </Field>
            </Stack>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" disabled={form.formState.isSubmitting}>
            Close
          </Button>
          <Button type="submit" form="create-instance-form" loading={form.formState.isSubmitting}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
