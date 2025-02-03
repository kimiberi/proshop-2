import React from 'react'
import Header from './Header'

const App = () => {
  // destructuring
  const nav = [
    {
      name: "Home",
      url: "/home"
    },
    {
      name: "About",
      url: "/about"
    }
  ]

  return (
    <div>
      <Header props={nav} />
    </div>
  )
}

export default App