import React from "react";
import style from "../css/characterData.module.css";

const CharacterData = ({ details }) => {
  const { status, species, gender, origin, location } = details;

  return (
    <>
      <div className={style.rowSpaceBetween}>
        <h4>Status:</h4>
        <p>{status}</p>
      </div>
      <div className={style.rowSpaceBetween}>
        <h4>Species:</h4>
        <p>{species}</p>
      </div>
      <div className={style.rowSpaceBetween}>
        <h4>Gender:</h4>
        <p>{gender}</p>
      </div>
      <div className={style.rowSpaceBetween}>
        <h4>Origin:</h4>
        <p>{origin}</p>
      </div>
      <div className={style.rowSpaceBetween}>
        <h4>Last Location:</h4>
        <p>{location}</p>
      </div>
    </>
  );
};

export default CharacterData;
