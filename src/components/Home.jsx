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
  const [cordinate, setCordinate] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCordinate(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // input: data, lat, lon
  // output: [{ name, mass, year, distance } ... ]
  // const formattedData = formatData(data, 50.775, 6.08333);
  console.log(props.data);

  return (
    <div className={classes.root}>
      <Typography variant='h3' component='h1' className={classes.title}>Visualisering av information</Typography>
      <Typography variant='h4' component='h2' >Projekt 3 - Avancerad visualisering</Typography>
      <br />
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-error-label">Cordinate</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={cordinate}
          onChange={handleChange}
          //renderValue={(value) => `⚠️  - ${value}`}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Arcada</MenuItem>
          <MenuItem value={20}>Pyramiderna</MenuItem>
          <MenuItem value={30}>The White House</MenuItem>
        </Select>
      </FormControl>
    </div>
      {props.isLoading ? 'Loading...' :
        <Scatterplot data={formatData(props.data, 50.775, 6.08333)} />
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
