import type { Component } from 'solid-js'
import { Router } from './contexts'
import { Post } from './pages/post'
import { Profile } from './pages/profile'

const App: Component = () => {
  return (
    <Router
      routes={{
        '/profile': {
          use: Profile,
        },
        '/post': {
          use: Post,
        },
      }}
    />
  )
}

export default App
