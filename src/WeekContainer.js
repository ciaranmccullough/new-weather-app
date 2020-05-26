import React from 'react';
var moment = require('moment');

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
      const weekday = this.state.dailyData.map(({ dt }) => (
          <li>{dt}</li>
      ));
      let newDate = new Date();
      newDate.setTime(weekday)
      moment(newDate).format('dddd');

    //   const imgURL = `owf owf-${reading.weather[0].id} owf-5x`; WEATHER ICONS (In public folder is styles)

      const listItems = this.state.dailyData.map(
        ({ weather: [{ description, icon, main, id }] }) => (
          <>
            <li>{moment(newDate).format('dddd')}</li>
            {/* I NEED TO IMPORT WEATHER ICONS TO HERE w/ id */}
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
