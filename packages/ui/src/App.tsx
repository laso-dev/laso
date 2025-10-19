import React from 'react'
import { Button } from './components/Button'

export const App: React.FC = () => {
  const { apiUrl, basename } = window.__INITIAL_STATE__

  return (
    <div>
      <h1>Laso App</h1>
      <p>API URL: {apiUrl}</p>
      <p>Basename: {basename}</p>
      <Button onClick={() => alert('Button clicked!')}>
        Click me
      </Button>
    </div>
  )
}

