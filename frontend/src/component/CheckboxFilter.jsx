import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import _ from "lodash";
import { getCardContent } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { type, checked, list, typeList } from "../redux/filterSlice";

const CheckboxFilter = () => {
  const dispatch = useDispatch();
  const isType = useSelector((state) => state.species.type);
  const isChecked = useSelector((state) => state.species.checked);
  const isTypeListData = useSelector((state) => state.species.list);
  const isTypeCategory = useSelector((state) => state.species.typeList);

  const [defaultPost, setDefaultPost] = useState([]);
  const [chipNameList, setChipNameList] = useState([]);
  const [chipCategoryList, setChipCategoryList] = useState([]);
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
    const isTypeNameExist = _.includes(chipNameList, isType.name);

    // if (isChecked) {
    //   const merged = [Object.assign({}, ...chipNameList)];
    //   if (!merged.hasOwnProperty(isType.category))
    //     setChipCategoryList([
    //       ...chipCategoryList,
    //       {
    //         [isType.category]: isType.name,
    //       },
    //     ]);
    // }

    // filter dataList based on the 'isType'
    const filterTypeList = _.filter(defaultPost, {
      [isType.category]: isType.name,
    });

    // const filterTypeList = _.filter(defaultPost, (item) =>
    //   item.species === "Alien" && ["Male", "Female"].includes(item.gender)
    // );

    // TRIAL
    // console.log(...chipCategoryList);
    // const filterTypeList = _.filter(defaultPost, ...isTypeCategory);
    // console.log(filterTypeList);

    // if checked AND 'isType' not yet exists THEN add it
    if (isChecked && !isTypeNameExist) {
      // setChipCategoryList([
      //   ...chipCategoryList,
      //   {
      //     [isType.category]: isType.name,
      //   },
      // ]);
      // dispatch(
      //   typeList([
      //     ...isTypeCategory,
      //     {
      //       [isType.category]: isType.name,
      //     },
      //   ])
      // );

      setChipNameList([...chipNameList, isType.name]);
      setShallowList([...shallowList, ...filterTypeList]);
      dispatch(list([...shallowList, ...filterTypeList]));
    }

    // if unchecked AND 'isType' still exists THEN delete it
    if (!isChecked && isTypeNameExist) {
      const result = _.reduce(
        chipNameList,
        (storeData, data) => {
          if (data !== isType.name) storeData.push(data);
          return storeData;
        },
        []
      ); // Returns [] if all values are removed
      setChipNameList(result);

      const resultTypeList = _.reduce(
        isTypeListData,
        (storeData, data) => {
          if (data.gender !== isType.name) storeData.push(data);
          return storeData;
        },
        []
      ); // Returns [] if all values are removed

      setShallowList(resultTypeList);
      dispatch(list(resultTypeList));
    }

    // console.log(isType);
    // console.log(isChecked);
    console.log(chipNameList);
    // console.log(shallowList);
    console.log(isTypeListData);
    // console.log(...chipCategoryList);
    // console.log(...isTypeCategory);
  }, [
    isType,
    isChecked,
    chipNameList,
    shallowList,
    dispatch,
    defaultPost,
    isTypeListData,
    chipCategoryList,
    isTypeCategory,
  ]); // Runs only when `type` or `checked` changes

  useEffect(() => {
    // RESET if ALL data had been checked or unchecked
    const fetchAllDataFiltered = async () => {
      const response = await isTypeListData;
      // console.log(response);
      if (_.isEmpty(response) || defaultPost.length === isTypeListData.length) {
        dispatch(list(defaultPost));
      }
    };
    fetchAllDataFiltered();

    // const merged = [Object.assign({}, ...chipCategoryList)];
    // if (!_.isEmpty(chipCategoryList)) {
    //   setChipCategoryList(merged);
    //   dispatch(typeList(merged));
    // }
  }, [chipNameList, dispatch, defaultPost, isTypeListData]); // Runs only when `chipNameList` changes

  return (
    <div style={{ background: "cornsilk", width: "20%", padding: "21px" }}>
      <h2>Filters</h2>
      <FormGroup sx={{ background: "blanchedalmond", padding: "15px" }}>
        <h4>Species</h4>
        <FormControlLabel
          control={
            <Checkbox
              value="Human"
              onChange={(e) => {
                dispatch(type({ category: "species", name: e.target.value }));
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
                dispatch(type({ category: "species", name: e.target.value }));
                dispatch(checked(e.target.checked));
              }}
            />
          }
          label="Alien"
        />
      </FormGroup>
      <br />
      <FormGroup sx={{ background: "blanchedalmond", padding: "15px" }}>
        <h4>Gender</h4>
        <FormControlLabel
          control={
            <Checkbox
              value="Male"
              onChange={(e) => {
                dispatch(type({ category: "gender", name: e.target.value }));
                dispatch(checked(e.target.checked));
              }}
            />
          }
          label="Male"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="Female"
              onChange={(e) => {
                dispatch(type({ category: "gender", name: e.target.value }));
                dispatch(checked(e.target.checked));
              }}
            />
          }
          label="Female"
        />
      </FormGroup>

      {/* {JSON.stringify(isChecked)}
      {JSON.stringify(isType)} */}
    </div>
  );
};

export default CheckboxFilter;
