import React from 'react';
import { Grid } from "@material-ui/core";
import StickerCard from './Components/StickerCard';
import './Stylesheets/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Grid style fixes horizontal overflow bug */}
        <Grid container spacing={5} style={{
          margin: 0,
          width: '100%',
        }}>
          <Grid item xs={6} sm={3}>
            <StickerCard />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StickerCard />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StickerCard />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StickerCard />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
