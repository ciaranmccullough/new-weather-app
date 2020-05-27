import React from 'react';
import moment from 'moment';

class WeekContainer extends React.Component {
  state = {
    data: [],
    dailyData: [], 
  };

  componentDidMount = () => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&%20exclude=minutely&appid=128944992833eb85f19eeebe5415027c`;

    fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
            data: data,
            dailyData: data.daily
          },
          () => console.log(this.state)
        );
      });
  };

  render() {
      const location = this.state.data.timezone;

    //  MOMENT.JS PROBLEM!

    // ---- UNIX timestamps are not standardised whether or not they are in Milliseconds or seconds so
    // Sometimes you have to multiply by 1000 to get packages like moment to work. You should also import
    // packages like moment in the react way. :) See above.
  

    //   const imgURL = `owf owf-${reading.weather[0].id} owf-5x`; WEATHER ICONS (In public folder is styles)

      const listItems = this.state.dailyData.map(
        // note that dt is now included here on the left
        ({ dt, weather: [{ description, icon, main, id }] }) => (
          <>
            <li>{moment(dt * 1000).format('dddd')}</li>
            {/* I NEED TO IMPORT WEATHER ICONS TO HERE w/ id */}
            {/* Here you must conditionally build up the url source link to the image using the ID and really cool template literals*/}
            <li><img src={`http://openweathermap.org/img/wn/${icon}.png`}/></li>
            <li>{id}</li>
            <li>{description}</li>
            <li>{icon}</li>
            <li>{main}</li>
          </>
        )
      );
       const listStyles = {
         listStyle: 'none',
         padding: '15px',
       };
    return (
      <div>
        <h1>{location}</h1>
    <ul style={listStyles}>{listItems}</ul>
      </div>
    );
  }
}

export default WeekContainer;
