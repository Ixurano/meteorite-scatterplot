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

      <Typography variant='body1'>
        Vi har fått data ifrån <a href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh">https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh</a><br/>

        Valet av data gick hand i hand med valet av visualiseringsteknik, vi brainstormade lite och funderade vad för sätt skulle det vara roligt att visualisera data och hurdan data i sådana fall.
        Valet blev då att ta meteorit data från nasa och plotta en scatterplot med basis av vikt gentemot avstånd till en viss koordinat, vidare utvecklat att ta olika positioner (koordinater för olika kända ställen) som sen ändrade plotten via transiton. 
        Det kändes som en ny och inte traditionsenlig datasats som kunde användas för om vecklingens skull.<br/><br/>

        Vi har lyckats i enlighet med kraven för projektet och utförligt arbete för det, har arbetat via discord och turats om att dela skärmen medans ena arbeta och den andra kollar och jobbar samtidigt och get tips, därav är commitsen lite ojämna emellan oss.
        Vi har lyckats med de delmoment vi lagt upp för oss själva i enlighet med projektbeskrivningen och lite nytänkande för vissa funktioner.<br/><br/>

        Vissa problem vi hade var först att API-datan inte var fullständig för vissa objekt och för att kringgå att det skulle se missvisande ut så gjorde vi en funktion som exempel ifall massan för en meteorit var NaN (Nasa hade inte data för det) så lägger vi den till 1 för att inte den data punkten skulle antingen vara i botten eller utanför grafen.<br/><br/>

        Ett annat problem vi hade va vår tickData då vår datamängds värde differera ifrån 1.0-20miljoner så måste vi sätta en logaritmiskskala.
        Vi började med att testa scaleLog() men den la punkterna på y-axeln helt fel och halva grafen blev ”avskuren”, vi testade sen med d3s nya scaleSymlog() den gjorde att det blev snyggare men de större värdarna där vi hade mycket mindre objekt i blev för ihop klumpade och såg inte bra ut. Vi hitta då en lösning igenom att sätta tillbaka till scaleLog() och sätta i y-axeln så att ”ticks” skrev ut 20st och formatera de som en string.<br/><br/>
        
        En av de större problemen vi hade var med griden för vi vilja ha en för det skulle va lättare att se och visualisera de olika värdarna då objekten har så stora data värden i sig (g och km) så vi började med att skapa en grid funktion som ritar gridden utifrån x och y-axeln, men den vilja inte uppdateras som den skulle via vår updateGraph() funktion, vi löste det igenom att sätta en transition och duration i onLoad() funktionen som ritar gridden för första grafen, efter det så har vi i updateGrapgh() samma grid funktion men med duration (1000) så den visuellt rör sig med grafens data då vi ändrar position(kordinaterna)<br/><br/>

        Vi tycker vi förtjänar en 5a eller i närheten av vitsord 5 för detta arbete, då vi har utfört ett exemplariskt arbete i enlighet av projektbeskrivningen och tagit egna initiativ att förbättra vissa punkter utöver det som kanske skulle ha krävts för de specifika delmomenten i projektet.

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
