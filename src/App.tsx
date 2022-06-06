import type { Component } from 'solid-js'
import { Route, Router } from './contexts'
import { Post } from './pages/post'
import { Profile } from './pages/profile'

// const {useRouter} = createRouter({
//   '/profile': {
//     component: Profile
//   },
//   '/post': {
//     component: Post
//   }
// })

const App: Component = () => {
  return (
    <Router>
      <Route path="/profile" component={Profile} /* handleTransition */ />
      <Route path="/post" component={Post} />
    </Router>
  )
}

export default App
