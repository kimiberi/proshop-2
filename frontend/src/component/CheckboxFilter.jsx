import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckboxFilter = () => {
    const [isChecked, setIsChecked] = useState(true);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        console.log(isChecked);
    }

  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox onChange={handleOnChange} />} label="Human" />
      <FormControlLabel control={<Checkbox />} label="Alien" />
    </FormGroup>
  )
}

export default CheckboxFilter