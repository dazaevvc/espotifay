import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?'
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    var accessToken = 'BQCmDssFj6KuB3EXId7io3z_FCTKr-bAd-CRQL8bRDx8TB5GlOlpO9CpxM952VIEwEMeJmNM_bCSJj_7063ggkLaq6hbyjx_hUL2dccMA3-RrdKZNakBqNF5js-OFhO1qLSY0r3GXfLCdfTuH1K-wzHX6aE8MwenZw&refresh_token=AQBXxbp1YO9PoyOxJv1Lt4Zk0ZS1v5kTuT9QOc_CSVk-IOn8vRD2Dcj64dQRnT8pPpPwKiAzjWoBhpTi2wwzau5M5LaOHPrQ3aMTB-gfPlYF4hNT9TWV82KYm9sg2MpdcmQ'

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          console.log('top tracks:', json);
          const {tracks} = json;
          this.setState({tracks});
        })
      })
  };


  render() {
    return(
      <div className='app'>
        <div className='app-title'>
          <img
            alt='Espotifay'
            className='app-logo'
            src='https://orig00.deviantart.net/6bca/f/2009/145/d/5/spotify_icon_by_obinoobie.png'
          />
          Espotifay
        </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='Search an Artist'
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter'){
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph='search'></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ? <div>
              <Profile
              artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
