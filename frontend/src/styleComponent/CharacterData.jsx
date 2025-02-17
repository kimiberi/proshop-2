import React from 'react'

const CharacterData = ({details}) => {
  const { status, species, gender, origin, location } = details;

  return (
    <>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <p>Status:</p>
          <p>{status}</p>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <p>Species:</p>
          <p>{species}</p>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <p>Gender:</p>
          <p>{gender}</p>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <p>Origin:</p>
          <p>{origin}</p>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <p>Last Location:</p>
          <p>{location}</p>
        </div>
    </>
  )
}

export default CharacterData