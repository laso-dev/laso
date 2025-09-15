import { api, trpc } from '../lib/trpc'

export default function Home() {
  const hello = trpc.hello.useQuery()

  return <h1>Home {hello.data}</h1>
}
