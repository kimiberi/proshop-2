import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import _ from "lodash";
import { getCardContent } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { type, checked, list } from '../redux/filterSlice';

const CheckboxFilter = () => {
    const dispatch = useDispatch();
    const speciesType = useSelector((state) => state.species.type);
    const speciesChecked = useSelector((state) => state.species.checked);
    const speciesList = useSelector((state) => state.species.list);

    const [post, setPost] = useState([]);

    const [isChecked, setIsChecked] = useState(false);
    const [species, setSpecies] = useState("");

    const handleOnChange = (e) => {
         setIsChecked(!isChecked);
         setSpecies(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
              const response = await getCardContent();
              setPost(response.data['results']);
              dispatch(list(response.data['results']));
            };
        fetchData();
        
    }, []); // Runs once when component mounts

    useEffect(() => {
        // Runs only when `type` or `checked` changes
        
        const filterSpecies = _.filter(post, { species: speciesType });
        !speciesChecked ? dispatch(list(post)) : dispatch(list(filterSpecies));

        console.log(speciesType);
        console.log(speciesChecked);

    }, [speciesType, speciesChecked]);

    console.log(speciesList);

  return (
    <>
    <FormGroup>
      <FormControlLabel control={<Checkbox value="Human" onChange={e => { dispatch(type(e.target.value)); dispatch(checked(e.target.checked)); }} />} label="Human" />
      <FormControlLabel control={<Checkbox value="Alien" onChange={e => { dispatch(type(e.target.value)); dispatch(checked(e.target.checked)); }} />} label="Alien" />
    </FormGroup>
    {JSON.stringify(speciesChecked)}
    {JSON.stringify(speciesType)}
    </>
  )
}

export default CheckboxFilter