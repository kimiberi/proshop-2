import React, { useState } from 'react'
// import "../index"
import style from "../component/card.module.css"

const getMenu = (getTitle) => {
    console.log(getTitle)
}

const Card = ({ title, desc }) => {
  const [details, setDetails] = useState();

  return (
    <div className={style.card} 
    style={{ border: "1px solid #777", textAlign: "center" }}
    onClick={getMenu(title)}
    >
        <h1>{title}</h1>
        <p>{desc}</p>
        
        <p>{details}</p>
        <button onClick={() => setDetails("blue")}>click</button>
    </div>
  )
}

export default Card