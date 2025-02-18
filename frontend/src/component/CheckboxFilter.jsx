import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import _, { isEmpty } from "lodash";
import { getCardContent } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { type, checked, list } from '../redux/filterSlice';

const CheckboxFilter = () => {
    const dispatch = useDispatch();
    const speciesType = useSelector((state) => state.species.type);
    const speciesChecked = useSelector((state) => state.species.checked);
    const speciesList = useSelector((state) => state.species.list);

    const [post, setPost] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [allList, setAllList] = useState([]);

    const [isChecked, setIsChecked] = useState(false);
    const [species, setSpecies] = useState("");

    // const handleOnChange = (e) => {
    //      setIsChecked(!isChecked);
    //      setSpecies(e.target.value);
    // }

    useEffect(() => {
        const fetchData = async () => {
              const response = await getCardContent();
              setPost(response.data['results']);
              dispatch(list(response.data['results']));
            };
        fetchData();
        
    }, []); // Runs once when component mounts

    useEffect(() => {
        // verify if 'speciesType' already exists
        const filterProcess = _.includes(filterList, speciesType);

        // filter dataList based on the 'speciesType'
        const filterSpecies = _.filter(post, { species: speciesType });

        // if checked AND 'speciesType' not yet exists THEN add it
        if (speciesChecked && !filterProcess) {
            setFilterList([...filterList, speciesType]);
            setAllList([...allList, ...filterSpecies]);
            dispatch(list([...allList, ...filterSpecies]));
        }

        // if unchecked AND 'speciesType' still exists THEN delete it
        if (!speciesChecked && filterProcess) {
            const result = _.reduce(filterList, (storeData, data) => {
                if (data !== speciesType) storeData.push(data);
                return storeData; 
            }, []); // Returns [] if all values are removed
            setFilterList(result);

            const resultAllList = _.reduce(allList, (storeData, data) => {
                if (data.species !== speciesType) storeData.push(data);
                return storeData; 
            }, []); // Returns [] if all values are removed

            setAllList(resultAllList);
            dispatch(list(resultAllList));
        } 

        // console.log(speciesType);
        // console.log(speciesChecked);
        console.log(filterList);
        console.log(allList);
        console.log(speciesList);

    }, [speciesType, speciesChecked, filterList, allList]); // Runs only when `type` or `checked` changes

    useEffect(() => {
        // RESET if ALL data had been checked or unchecked
        const fetchAllDataFiltered = async () => {
              const response = await speciesList;
              console.log(response);
            //   dispatch(list(response.data['results']));
              if (_.isEmpty(response) || post.length === speciesList.length) {
                dispatch(list(post));
              }
            };
        fetchAllDataFiltered();
        
    }, [filterList]); // Runs only when `filterList` changes

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