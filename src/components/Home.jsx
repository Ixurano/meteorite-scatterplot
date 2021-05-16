import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

// Components
import Scatterplot from './Scatterplot';

// Helpers
import formatData from '../helpers/formatData';

const Home = (props) => {
  const classes = useStyles();
  const [cordinate, setCordinate] = React.useState(
    { "lat": 60.201400, "lon": 24.966100 }
  );

  const handleChange = (event) => {
    setCordinate(JSON.parse(event.target.value));
  };

  return (
    <div className={classes.root}>
      <Typography variant='h3' component='h1' className={classes.title}>Visualisering av information</Typography>
      <Typography variant='h4' component='h2' >Projekt 3 - Avancerad visualisering</Typography>
      <br />
      <Typography variant='body1' component='p' >
        Det här är en scatterplott över meteorit massa(g) i förhållande till avstånd(km) från en kordinat.
        Datan hämtas från NASAs open data tjänst på <a href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh">data.nasa.gov</a>.
        Alla värden finns inte tillgängliga för alla meteoriter i datasettet så meteoriter utan massa har fått värdet 1.
      </Typography>
      <br />
      {props.isLoading ? 'Loading graph...' :

        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label">Cordinates</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              onChange={handleChange}
              defaultValue=""
              value={JSON.stringify(cordinate)}
            >
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

      <Typography variant='h5' component='h3' style={{ marginTop: '1rem' }}>Raport</Typography>

      <Typography variant='body1' component='p' >
        Kanske vi har raporten här?
      </Typography>
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
    minWidth: '8rem',
  }
}));
