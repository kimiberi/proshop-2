import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
// import axios from "axios";
import { getCardContent } from '../services/api';
import _ from "lodash";
import moment from "moment";
import CharacterData from '../styleComponent/CharacterData';
import { useSelector, useDispatch } from 'react-redux';
import { type, checked, list } from '../redux/filterSlice';

// const baseURL = "https://rickandmortyapi.com/api/character/";

const Cards = () => {
  const type1 = useSelector((state) => state.species.type);
  const checked1 = useSelector((state) => state.species.checked);
  const list1 = useSelector((state) => state.species.list);
  const dispatch = useDispatch();

  return (
      <Grid container spacing={2}>
        {_.map(list1, (data) => (
          <Grid size={4} key={data.id}>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={data.name}
              height="100%"
              image={data.image}
            />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>

                <Typography component={'span'} variant="body2" sx={{ color: 'text.secondary' }}>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                  <span>ID: {data.id}</span>
                  <span>created: {moment(data.created, "YYYYMMDD").fromNow()}</span>
                </Stack>
                </Typography>
                
                <Typography component={'span'} variant="body2" sx={{ color: 'text.secondary' }}>
                  <CharacterData details={{
                    "status": data.status, 
                    "species": data.species, 
                    "gender": data.gender,
                    "origin": data.origin['name'],
                    "location": data.location['name'],
                    }} />
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => {dispatch(type("Alien")); dispatch(checked())}}>Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
  )
}

export default Cards