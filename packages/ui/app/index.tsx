import { Route, Switch } from 'wouter'
import { Home } from './routes/home'

export function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </>
  )
}
