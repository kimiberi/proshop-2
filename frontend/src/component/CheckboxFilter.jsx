import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import style from "../css/checkboxFilter.module.css";
import _ from "lodash";
import { getCardContent } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import {
  type,
  typeName,
  checked,
  list,
  speciesList,
} from "../redux/filterSlice";

const CheckboxFilter = () => {
  const dispatch = useDispatch();
  const isType = useSelector((state) => state.category.type);
  const isTypeName = useSelector((state) => state.category.typeName);
  const isChecked = useSelector((state) => state.category.checked);

  const isTypeListData = useSelector((state) => state.category.list);
  const isSpeciesList = useSelector((state) => state.category.speciesList);

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
    const filterTypeList = _.filter(defaultPost, { [isTypeName]: isType });

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

    console.log(isType);
    // console.log(isChecked);
    console.log(chipList);
    // console.log(shallowList);
    // console.log(isTypeListData);
    console.log(isTypeName);
  }, [
    isType,
    isChecked,
    chipList,
    shallowList,
    dispatch,
    defaultPost,
    isTypeListData,
    isTypeName,
  ]); // Runs only when `type` or `checked` changes

  useEffect(() => {
    // RESET if ALL data had been checked or unchecked
    const fetchAllDataFiltered = async () => {
      const response = await isTypeListData;
      // console.log(response);
      //   dispatch(list(response.data['results']));
      if (_.isEmpty(response) || defaultPost.length === isTypeListData.length) {
        dispatch(list(defaultPost));
      }
    };
    fetchAllDataFiltered();
  }, [chipList, dispatch, defaultPost, isTypeListData]); // Runs only when `chipList` changes

  return (
    <div style={{ width: "20%", background: "#f8ebe0", padding: "21px" }}>
      <h2>Filter</h2>

      <div className={style.filterBox}>
        <h3>Species</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value="Human"
                onChange={(e) => {
                  dispatch(type(e.target.value));
                  dispatch(typeName("species"));
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
                  dispatch(typeName("species"));
                  dispatch(checked(e.target.checked));
                }}
              />
            }
            label="Alien"
          />
        </FormGroup>
      </div>

      <div className={style.filterBox}>
        <h3>Gender</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value="Female"
                onChange={(e) => {
                  dispatch(type(e.target.value));
                  dispatch(typeName("gender"));
                  dispatch(checked(e.target.checked));
                }}
              />
            }
            label="Female"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Male"
                onChange={(e) => {
                  dispatch(type(e.target.value));
                  dispatch(typeName("gender"));
                  dispatch(checked(e.target.checked));
                }}
              />
            }
            label="Male"
          />
        </FormGroup>
      </div>
      {JSON.stringify(isChecked)}
      {JSON.stringify(isType)}
    </div>
  );
};

export default CheckboxFilter;
