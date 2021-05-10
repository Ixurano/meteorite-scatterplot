import Home from './components/Home';
import React, { useEffect, useState } from 'react';

// Material-UI
import { CssBaseline } from '@material-ui/core';

const App = () => {
  const [appState, setAppState] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://data.nasa.gov/resource/gh4g-9sfh.json`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setAppState({ loading: false, data: data });
      });
  }, [setAppState]);

  return (
    <div>
      <CssBaseline />
      <Home isLoading={appState.loading} data={appState.data} />
    </div>
  );
}

export default App;
