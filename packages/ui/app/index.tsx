import { Link, Route, Switch } from 'wouter'
import { Home } from './routes/home'

export default function App() {
  return (
    <>
      <Link href="/users/1">Profile</Link>

      <Route path="/about">About Us</Route>

      <Switch>
        <Route path="/inbox" component={Home} />
        <Route path="/users/:name">{(params) => <>Hello, {params.name}!</>}</Route>
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}
