import React, {Component} from 'react';
import {WiRain, WiNightPartlyCloudy, WiDaySunny, WiSnow, WiWindy, WiAlien} from "weather-icons-react";
import './weather-widget.scss';

class WeatherWidget extends Component {

    constructor(props) {
        super(props);
        this.city = props.city;
        this.units = props.units
        this.state = {location: [], time: [], temperature: [], weather: [], weatherIcon: []};
    }

    componentDidMount() {
        const apiURL = process.env.REACT_APP_WHEATHER_API_URL;
        const apiParams = '?q=' + this.city + '&appid=' + process.env.REACT_APP_WHEATHER_API_ID + '&units=' + this.units;
        try {
            fetch(apiURL + apiParams)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    if (data.cod != 401) {
                        data.weather[0].description = data.weather[0].description.toUpperCase();

                        this.setState({
                            location: data.name,
                            time: (new Date()).toTimeString(),
                            temperature: data.main,
                            weather: data.weather[0],
                            weatherIcon: this.getWeatherIcon(data.weather[0].main)
                        })
                    } else {
                      alert(data.message);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="container-fluid wrapper">
                <div className="row col header">
                    {this.state.location}&nbsp; {this.state.time}
                </div>
                <div className="row">
                    <div className="col-9">
                        {this.state.weatherIcon}{this.state.weather.description}
                    </div>
                    <div className="col main-temperature">{this.state.temperature.temp}&#730;</div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col">Max Temp:</div>
                    <div className="col">{this.state.temperature.temp_max}&#730;</div>
                </div>
                <div className="row">
                    <div className="col">Min Temp:</div>
                    <div className="col">{this.state.temperature.temp_min}&#730;</div>
                </div>
                <div className="row">
                    <div className="col">Humidity:</div>
                    <div className="col">{this.state.temperature.humidity}%</div>
                </div>
                <div className="row">
                    <div className="col">Pressure:</div>
                    <div className="col">{this.state.temperature.pressure}mb</div>
                </div>
            </div>
        )
    }

    /**
     * Get a weather HTML element with a correct icon
     * if case is not find we give it an alien symbol.
     * @param weather
     * @returns {*}
     */
    getWeatherIcon(weather) {
        switch (weather.toString().toLowerCase()) {
            case "drizzle":
            case "rain":
                return <WiRain size={42} color='#fff'/>;
            case "sunny":
                return <WiDaySunny size={42} color='#fff'/>
            case 'windy':
                return <WiWindy size={42} color='#fff'/>
            case 'snow':
                return <WiSnow size={42} color='#fff'/>
            default:
                return <WiAlien size={42} color='#fff'/>
        }
    }
}

export default WeatherWidget;