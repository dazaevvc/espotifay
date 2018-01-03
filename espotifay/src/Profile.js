import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render(){
    console.log(this.props);
    let artist = {
      name: '',
      followers: {
        total: ''
      },
      images: [{
        url: ''
      }],
      genres: [],
    }
    artist = this.props.artist !== null ? this.props.artist : artist;

    return(
      <div className='profile'>
        <img
          alt='Profile'
          className='profile-img'
          src={artist.images[0].url}
        />
        <div className='profile-info'>
          <div className='profile-name'>
            Artist: {artist.name}
          </div>
          <div className='profile-followers'>
            Followers: {artist.followers.total}
          </div>
          <div className='profile-genres'>
            Genres:
            {
              artist.genres.map((genres, key) => {
                genres = genres !== artist.genres[artist.genres.length - 1]
                                ? ` ${genres}, `
                                : ` ${genres}.`;
                return (
                  <span key={key}>{genres}</span>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
};

export default Profile;
