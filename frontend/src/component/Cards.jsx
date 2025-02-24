import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CharacterData from "../styleComponent/CharacterData";
import { useSelector, useDispatch } from "react-redux";
import { list } from "../redux/filterSlice";
import { getCardContent } from "../services/api";

// const baseURL = "https://rickandmortyapi.com/api/character/";

const Cards = () => {
  const dispatch = useDispatch();
  const isTypeListData = useSelector((state) => state.category.list);

  const [defaultPost, setDefaultPost] = useState([]);
  const [search, setSearch] = useState("");
  const [opt, setOpt] = useState("asc");
  const [post, setPost] = useState(true);
  const [post1, setPost1] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCardContent();
      setDefaultPost(response.data["results"]);
      dispatch(list(response.data["results"]));
    };
    fetchData();
  }, []); // Runs once when component mounts

  const onSearchName = (name) => {
    setSearch(name);
    // console.log(search);
    // console.log(defaultPost);

    const searchWords = _.split(_.toLower(search), " ");

    const results = _.filter(defaultPost, (item) =>
      _.some(searchWords, (word) => _.includes(_.toLower(item.name), word))
    );

    // console.log(results);
    dispatch(list(results));
    // console.log(isTypeListData);
  };

  const onAscDesc = (option) => {
    console.log(option);
    setOpt(option);

    // Sorting function
    // const sortData = (data, order) => {
    //   return _.orderBy(data, ["id"], [order]); // "asc" for ascending, "desc" for descending
    // };

    // console.log(option);
    // if (option === "asc") {
    //   // Ascending order
    //   console.log(sortData(isTypeListData, "asc"));
    //   // Output: [{ id: 1, name: "Morty" }, { id: 2, name: "Summer" }, { id: 3, name: "Rick" }]
    // }

    // if (option === "desc") {
    //   // Descending order
    //   console.log(sortData(isTypeListData, "desc"));
    //   const result = sortData(isTypeListData, "desc");
    //   // Output: [{ id: 3, name: "Rick" }, { id: 2, name: "Summer" }, { id: 1, name: "Morty" }]
    //   dispatch(list(result));
    // }
  };

  useEffect(() => {
    console.log("Sorting with option:", opt);

    const sortData = (data, order) => {
      return _.orderBy(data, ["id"], [order]); // Sort by "id"
    };

    const result =
      opt === "desc"
        ? sortData(isTypeListData, "desc")
        : sortData(isTypeListData, "asc");

    console.log("Sorted Result:", result);

    // Check if new sorted data is different before updating state
    if (!_.isEqual(sortedData, result)) {
      setSortedData(result);
    }
  }, [opt, isTypeListData]); // Dependencies

  // Dispatch to Redux when `sortedData` changes
  useEffect(() => {
    console.log(sortedData);

    if (sortedData.length > 0) {
      // not working
      dispatch(list(sortedData));
      console.log(isTypeListData);
    }
  }, [sortedData, dispatch]); // Dependencies

  return (
    <div style={{ width: "80%", background: "#f8ebe0", padding: "50px" }}>
      <Stack direction="row" spacing={2}>
        <div style={{ width: "50%" }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={(e) => onSearchName(search)}>
              Search
            </Button>
            <TextField
              id="filled-basic"
              label="Search name"
              variant="filled"
              sx={{ width: "100%" }}
              onChange={(e) => {
                setSearch(e.target.value);
                // console.log(e.target.value);
              }}
            />
          </Stack>
        </div>

        <div style={{ width: "50%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Option</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={opt}
              value={opt}
              label="Option"
              onChange={(e) => onAscDesc(e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Stack>
      <br />
      <br />

      <Grid container spacing={5}>
        {_.map(sortedData ? sortedData : isTypeListData, (data) => (
          <Grid size={4} key={data.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={data.name}
                height="100%"
                image={data.image}
              />

              <CardContent sx={{ background: "#eedfd0" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>

                <Typography
                  component={"span"}
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <span>ID: {data.id}</span>
                    <span>
                      created: {moment(data.created, "YYYYMMDD").fromNow()}
                    </span>
                  </Stack>
                </Typography>

                <Typography
                  component={"span"}
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  <CharacterData
                    details={{
                      status: data.status,
                      species: data.species,
                      gender: data.gender,
                      origin: data.origin["name"],
                      location: data.location["name"],
                    }}
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
