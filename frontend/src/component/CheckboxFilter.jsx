import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import _ from "lodash";
import { getCardContent } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { type, checked, list } from "../redux/filterSlice";

const CheckboxFilter = () => {
  const dispatch = useDispatch();
  const isType = useSelector((state) => state.category.type);
  const isChecked = useSelector((state) => state.category.checked);
  const isTypeListData = useSelector((state) => state.category.list);

  const [defaultPost, setDefaultPost] = useState([]);
  const [chipList, setChipList] = useState([]);
  const [shallowList, setShallowList] = useState([]);

  // const [isChecked, setIsChecked] = useState(false);
  // const handleOnChange = (e) => {
  //      setIsChecked(!isChecked);
  //      setSpecies(e.target.value);
  // }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCardContent();
      setDefaultPost(response.data["results"]);
      dispatch(list(response.data["results"]));
    };
    fetchData();
  }, [dispatch]); // Runs once when component mounts

  useEffect(() => {
    // verify if 'isType' already exists
    const isTypeExist = _.includes(chipList, isType);

    // filter dataList based on the 'isType'
    const filterTypeList = _.filter(defaultPost, { species: isType });

    // if checked AND 'isType' not yet exists THEN add it
    if (isChecked && !isTypeExist) {
      setChipList([...chipList, isType]);
      setShallowList([...shallowList, ...filterTypeList]);
      dispatch(list([...shallowList, ...filterTypeList]));
    }

    // if unchecked AND 'isType' still exists THEN delete it
    if (!isChecked && isTypeExist) {
      const result = _.reduce(
        chipList,
        (storeData, data) => {
          if (data !== isType) storeData.push(data);
          return storeData;
        },
        []
      ); // Returns [] if all values are removed
      setChipList(result);

      const resultTypeList = _.reduce(
        shallowList,
        (storeData, data) => {
          if (data.species !== isType) storeData.push(data);
          return storeData;
        },
        []
      ); // Returns [] if all values are removed

      setShallowList(resultTypeList);
      dispatch(list(resultTypeList));
    }

    // console.log(isType);
    // console.log(isChecked);
    console.log(chipList);
    console.log(shallowList);
    console.log(isTypeListData);
  }, [
    isType,
    isChecked,
    chipList,
    shallowList,
    dispatch,
    defaultPost,
    isTypeListData,
  ]); // Runs only when `type` or `checked` changes

  useEffect(() => {
    // RESET if ALL data had been checked or unchecked
    const fetchAllDataFiltered = async () => {
      const response = await isTypeListData;
      console.log(response);
      //   dispatch(list(response.data['results']));
      if (_.isEmpty(response) || defaultPost.length === isTypeListData.length) {
        dispatch(list(defaultPost));
      }
    };
    fetchAllDataFiltered();
  }, [chipList, dispatch, defaultPost, isTypeListData]); // Runs only when `chipList` changes

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value="Human"
              onChange={(e) => {
                dispatch(type(e.target.value));
                dispatch(checked(e.target.checked));
              }}
            />
          }
          label="Human"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="Alien"
              onChange={(e) => {
                dispatch(type(e.target.value));
                dispatch(checked(e.target.checked));
              }}
            />
          }
          label="Alien"
        />
      </FormGroup>
      {JSON.stringify(isChecked)}
      {JSON.stringify(isType)}
    </>
  );
};

export default CheckboxFilter;
