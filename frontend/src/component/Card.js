import React from 'react'
// import "../index"
import style from "../component/card.module.css"

const getMenu = (getTitle) => {
    console.log(getTitle)
}

const Card = ({ title, desc }) => {
  return (
    <div className={style.card} 
    style={{ border: "1px solid #777", textAlign: "center" }}
    onClick={getMenu(title)}
    >
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>
  )
}

export default Card