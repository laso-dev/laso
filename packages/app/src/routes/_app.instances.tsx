import { Button, Card, Center, Container, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { LuDatabase, LuPlus, LuSquarePen } from 'react-icons/lu'
import { authMiddleware } from '../lib/auth/middleware'
import { db } from '../lib/db'

const getInstances = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const orgId = context.organization?.id

    return db
      .selectFrom('instances')
      .select(['id', 'name', 'created_at', 'updated_at'])
      .where('organization_id', '=', orgId)
      .execute()
  })

const createInstance = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const orgId = context.organization?.id

    await db
      .insertInto('instances')
      .values({ name: 'New Instance', organization_id: orgId, connection: JSON.stringify({}) })
      .execute()
  })

export const Route = createFileRoute('/_app/instances')({
  component: RouteComponent,
  loader: async () => ({
    instances: await getInstances(),
  }),
})

function RouteComponent() {
  const data = Route.useLoaderData()

  const instances = useQuery({
    queryKey: ['instances'],
    queryFn: getInstances,
    initialData: data.instances,
  })

  const create = useMutation({
    mutationFn: useServerFn(createInstance),
  })

  const emptyMarkup = instances.isSuccess && instances?.data?.length === 0 && (
    <Center h="full">
      <Card.Root>
        <Card.Body maxW="sm">
          <Stack>
            <LuDatabase />
            <Text fontFamily="mono" fontWeight="medium" mt="2">
              Instances
            </Text>

            <Text color="fg.muted" fontFamily="mono" fontSize="xs">
              An instance represents a Redis connection that Bull uses to manage and monitor your
              job queues.
            </Text>
            <Text color="fg.muted" fontFamily="mono" fontSize="xs">
              Each instance lets you connect to a different Redis server or cluster, so you can
              track jobs, workers, and queue health.
            </Text>

            <Button w="fit" mt="4">
              <LuPlus /> Add
            </Button>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Center>
  )

  return (
    <Stack h="full">
      <Flex
        alignItems="center"
        h="12"
        bg="bg.panel"
        borderBottomWidth="1px"
        borderColor="border.emphasized/40"
        px="4"
      >
        <Text fontFamily="mono" fontWeight="medium">
          Instances
        </Text>

        <Button
          ml="auto"
          onClick={() => {
            create.mutateAsync({})
            instances.refetch()
          }}
        >
          <LuPlus /> Add
        </Button>
      </Flex>

      {emptyMarkup}

      {instances.isSuccess && instances.data.length > 0 && (
        <Container maxW="4xl" my="8">
          <Stack>
            {instances.data.map((instance) => (
              <HStack h="12">
                <Text fontFamily="mono">{instance.name}</Text>
                <Button size="sm" variant="ghost" ml="auto">
                  <LuSquarePen />
                </Button>
              </HStack>
            ))}
          </Stack>
        </Container>
      )}
    </Stack>
  )
}
