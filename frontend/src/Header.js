import React from 'react'

const Header = ({props}) => {
  const name = "kim"

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