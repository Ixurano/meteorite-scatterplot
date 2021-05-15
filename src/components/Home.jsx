import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// Components
import Scatterplot from './Scatterplot';
import formatData from '../helpers/formatData';

const Home = (props) => {
  const classes = useStyles();
  const [cordinate, setCordinate] = React.useState(
    { "lat": 60.201400, "lon": 24.966100 }
  );

  // const options = [
  //   {"lat" : 60.201400, "lon" : 24.966100},
  //   {"lat" : 38.897700, "lon" : -77.036500},
  //   {"lat" : 29.979200, "lon" : 31.134200},
  //   {"lat" : 60.178500, "lon" : 19.915600},
  //   {"lat" : 48.858400, "lon" : 2.294500},
  //   {"lat" : 41.890200, "lon" : 12.492200}
  // ]
  //const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCordinate(JSON.parse(event.target.value));
    //console.log(event.target.value);
  };

  // input: data, lat, lon
  // output: [{ name, mass, year, distance } ... ]
  // const formattedData = formatData(data, 50.775, 6.08333);
  //console.log(props.data);

  return (
    <div className={classes.root}>
      <Typography variant='h3' component='h1' className={classes.title}>Visualisering av information</Typography>
      <Typography variant='h4' component='h2' >Projekt 3 - Avancerad visualisering</Typography>
      <br />
      <div>

      </div>
      {props.isLoading ? 'Loading...' :

        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-error-label">Cordinate</InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"

              onChange={handleChange}
              defaultValue=""
              value={JSON.stringify(cordinate)}
            >
               <MenuItem value="">
            <em>None</em>
          </MenuItem>
              <MenuItem value={JSON.stringify({ "lat": 60.201400, "lon": 24.966100 })}>Arcada</MenuItem>
              <MenuItem value={JSON.stringify({ "lat": 38.897700, "lon": -77.036500 })}>The white house</MenuItem>
              <MenuItem value={JSON.stringify({ "lat": 29.979200, "lon": 31.134200 })}>The great pyramid of Giza</MenuItem>
              <MenuItem value={JSON.stringify({ "lat": 60.178500, "lon": 19.915600 })}>Åland Islands</MenuItem>
              <MenuItem value={JSON.stringify({ "lat": 48.858400, "lon": 2.294500 })}>Eiffel tower</MenuItem>
              <MenuItem value={JSON.stringify({ "lat": 41.890200, "lon": 12.492200 })}>Colosseum</MenuItem>
            </Select>
          </FormControl>

          <Scatterplot data={formatData(props.data, cordinate.lat, cordinate.lon)} />
        </div>

      }

    </div>
  );
}

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
    padding: '1rem'
  },
  title: {
    marginTop: '4rem',
  },
  formControl: {
    width: '8rem',
    padding: '0.5rem'
  }
}));
