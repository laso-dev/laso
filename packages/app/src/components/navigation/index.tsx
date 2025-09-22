import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export const Navigation = () => {
  return (
    <>
      <Navbar hideFrom="md" />
      <Sidebar hideBelow="md" />
    </>
  )
}
