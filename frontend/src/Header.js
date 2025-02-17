import React from 'react'

const Header = ({props}) => {
  const name = "kim"

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
      <h1>Welcome {name}</h1>

      <ul>
      {props.map((data, index) => (
        <li key={index}>
          <a href={data.url}>{data.name}</a>
        </li>
      ))}
      </ul>
    </div>
  )
}


export default Header