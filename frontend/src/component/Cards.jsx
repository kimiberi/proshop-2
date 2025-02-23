import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
// import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CharacterData from "../styleComponent/CharacterData";
import { useSelector } from "react-redux";

// const baseURL = "https://rickandmortyapi.com/api/character/";

const Cards = () => {
  const isTypeListData = useSelector((state) => state.category.list);

  return (
    <div style={{ width: "80%", background: "#f8ebe0", padding: "50px" }}>
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
