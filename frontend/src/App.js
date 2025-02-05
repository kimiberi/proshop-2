import React from 'react'
import Header from './Header'
import Card from './component/Card'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
      <Card title="Card 1" desc="This is Card 1 description" />

      <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
    </div>
  )
}

export default App