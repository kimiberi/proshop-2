import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { human } from '../redux/counterSlice';

const CheckboxFilter = () => {
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false);
    const [species, setSpecies] = useState("");

    const handleOnChange = (e) => {
         setIsChecked(!isChecked);
         setSpecies(e.target.value);
    }

    useEffect(() => {
        // action on update of species

    }, [species, isChecked]);

  return (
    <>
    <FormGroup>
      <FormControlLabel control={<Checkbox value="human" onChange={e => handleOnChange(e)} />} label="Human" />
      <FormControlLabel control={<Checkbox value="alien" onChange={e => handleOnChange(e)} />} label="Alien" />
    </FormGroup>
    {JSON.stringify(isChecked)}
    {species}
    </>
  )
}

export default CheckboxFilter