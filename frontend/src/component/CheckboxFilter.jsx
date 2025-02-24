import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
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
  const [testList, setTestList] = useState(true);
  const [testList1, setTestList1] = useState(true);

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

    // TRUE if "Human" OR "Alien" is in chipList
    const verifySpecies = _.some(["Human", "Alien"], (value) =>
      _.includes(chipList, value)
    );
    // TRUE if "Female" OR "Male" OR "Unknown" is in chipList
    const verifyGender = _.some(["Female", "Male", "Unknown"], (value) =>
      _.includes(chipList, value)
    );
    // TRUE if "Female" OR "Male" OR "Unknown" is in chipList
    const verifyOrigin = _.some(["Earth (C-137)"], (value) =>
      _.includes(chipList, value)
    );

    // filter dataList based on the 'isType'
    // if (typeName !== "origin") {
    //   const filterTypeList = _.filter(defaultPost, { [isTypeName]: isType });
    //   console.log(filterTypeList);
    // }

    const newTypeName = `${isTypeName}['name']`;
    console.log(newTypeName);

    const filterTypeList1 = _.filter(
      defaultPost,
      (item) => _.get(item, newTypeName) === isType
    );
    console.log(filterTypeList1);

    const filterTypeList =
      typeName !== "origin"
        ? _.filter(defaultPost, { [isTypeName]: isType })
        : filterTypeList1;

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
          if (verifySpecies && data.species !== isType) storeData.push(data);
          if (verifyGender && data.gender !== isType) storeData.push(data);
          if (verifyOrigin && data.origin["name"] !== isType)
            storeData.push(data);

          return storeData;
        },
        []
      ); // Returns [] if all values are removed

      setShallowList(resultTypeList);
      dispatch(list(resultTypeList));
    }

    console.log(isType);
    // console.log(isChecked);
    // console.log(chipList);
    console.log(shallowList);
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

      dispatch(speciesList(response));
      // console.log(isSpeciesList);
    };
    fetchAllDataFiltered();
  }, [chipList, dispatch, defaultPost, isTypeListData, isSpeciesList]); // Runs only when `chipList` changes

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  // TRIAL
  // useEffect(() => {
  //   const fetchSpeciesList = async () => {
  //     const response = await isTypeListData;

  //     if (_.isEmpty(isSpeciesList)) {
  //       dispatch(speciesList(response));
  //     }

  //     const idCounts = _.countBy(response, "id"); // { '1': 1, '2': 2, '3': 1 }
  //     const hasDuplicates = _.some(idCounts, (count) => count > 1);
  //     console.log(hasDuplicates); // true ✅ (because id: 2 is duplicated)

  //     if (!_.isEmpty(isSpeciesList) && !hasDuplicates) {
  //       dispatch(speciesList(response));
  //     }

  //     if (!_.isEmpty(isSpeciesList) && hasDuplicates && testList) {
  //       const uniqueCharacters = _.uniqBy(response, "id");
  //       dispatch(speciesList(uniqueCharacters));
  //       setTestList(false);
  //     }
  //   };

  //   fetchSpeciesList();

  //   console.log(isTypeListData);
  //   console.log(isSpeciesList);
  // }, [isTypeListData, isSpeciesList, dispatch, chipList]);

  // useEffect(() => {
  //   const fetchSpeciesList = async () => {
  //     const response = await isSpeciesList;

  //     const idCounts = _.countBy(response, "id"); // { '1': 1, '2': 2, '3': 1 }
  //     const hasDuplicates = _.some(idCounts, (count) => count > 1);
  //     console.log(hasDuplicates); // true ✅ (because id: 2 is duplicated)

  //     if (!hasDuplicates && testList1) {
  //       const filterDataInOrder = (data, chipList) => {
  //         return data.filter((item) =>
  //           chipList.every((chip) => [item.species, item.gender].includes(chip))
  //         );
  //       };
  //       const result = filterDataInOrder(response, chipList);
  //       console.log(result); // Expected output: []
  //       setTestList1(false);
  //     }

  //     // console.log(response);
  //   };

  //   fetchSpeciesList();

  //   console.log(isTypeListData);
  //   console.log(isSpeciesList);
  // }, [isTypeListData, isSpeciesList, dispatch, chipList]);

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

      <br />
      <br />
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
          <FormControlLabel
            control={
              <Checkbox
                value="unknown"
                onChange={(e) => {
                  dispatch(type(e.target.value));
                  dispatch(typeName("gender"));
                  dispatch(checked(e.target.checked));
                }}
              />
            }
            label="Unknown"
          />
        </FormGroup>
      </div>

      <br />
      <br />
      <div className={style.filterBox}>
        <h3>Origin</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value="Earth (C-137)"
                onChange={(e) => {
                  dispatch(type(e.target.value));
                  dispatch(typeName("origin"));
                  dispatch(checked(e.target.checked));
                }}
              />
            }
            label="Earth (C-137)"
          />
        </FormGroup>
      </div>
      {/* {JSON.stringify(isChecked)}
      {JSON.stringify(isType)} */}

      <br />
      <br />
      <Stack direction="row" spacing={1}>
        {chipList
          ? _.map(chipList, (chip) => (
              <Chip
                label={chip}
                onDelete={handleDelete}
                sx={{ background: "darksalmon" }}
              />
            ))
          : []}
        {/* {JSON.stringify(chipList)} */}
      </Stack>
    </div>
  );
};

export default CheckboxFilter;
