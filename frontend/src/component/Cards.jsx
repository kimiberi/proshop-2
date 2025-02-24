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

  const onSearchName = (name) => {
    setSearch(name);
    console.log(search);
    console.log(defaultPost);

    const searchTerms = _.split(_.toLower(search), " ");

    const results = _.filter(defaultPost, (item) =>
      _.some(searchTerms, (term) => _.includes(_.toLower(item.name), term))
    );

    console.log(results);
    dispatch(list(results));
    console.log(isTypeListData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCardContent();
      setDefaultPost(response.data["results"]);
      dispatch(list(response.data["results"]));
    };
    fetchData();
  }, []); // Runs once when component mounts

  // useEffect(() => {
  //   // Partial search

  // }, []);

  return (
    <div style={{ width: "80%", background: "#f8ebe0", padding: "50px" }}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={(e) => onSearchName(search)}>
          Search
        </Button>
        <TextField
          id="filled-basic"
          label="Search name"
          variant="filled"
          sx={{ width: "40%" }}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(e.target.value);
          }}
        />
      </Stack>
      <br />
      <br />

      <Grid container spacing={5}>
        {_.map(isTypeListData, (data) => (
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
