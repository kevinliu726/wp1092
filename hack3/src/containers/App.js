import React, { useState, useEffect } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

function App() {
  const [data, setData] = useState({}) // all MRT station data
  const [current_station_id, setCurrentStationId] = useState('None') // station clicked by cursor
  const [start_station, setStartStation] = useState('') // station selected as the starting one
  const [end_station, setEndStation] = useState('') // station selected as the ending one
  const [distance, setDistance] = useState(-2) // distance shown on the screen

  const station_type = current_station_id[0] // R10, station_type = R
  const station_order = current_station_id.slice(1, current_station_id.length) // R10, station_order = 10
  const station_info = current_station_id[0] !== 'N' ? data[station_type][parseInt(station_order) - 1] : null // get certain station information

  const getStations = async () => {
      const res = await axios.get(API_ROOT+"/getStations");
      if (res.data.message === 'success') {
        setData(res.data.data)
      }
  }

  const calculateDistance = async () => {
    // send start and end stations to backend and get distance
    // coding here ...
  }

  useEffect(() => {
    if (!Object.keys(data).length) {
      getStations()
    }
    console.log(data)
  })

  if (!Object.keys(data).length) {
    return (
      <div className="wrapper">
        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      <div className="calculator-container">
        <div className="mode-selector">
          
          <span id="start-station-span">起始站</span>
          <select id="start-select" className="start-station"> {/* you should add both onChange and value to attributes */}
            <option></option>
            {
              // generate options of all stations within option group
              // coding here ...
            }
          </select>

          <span id="end-station-span">終點站</span>
          <select id="end-select" className="end-station"> {/* you should add both onChange and value to attributes */}
            <option></option>
            {
              // generate options of all stations within option group
              // coding here ...
            }
          </select>

          <button onClick={calculateDistance} id="search-btn">查詢距離</button>
          <span id="answer"> {/* you should add className to attributes */}
            {distance}
          </span>
          <span id="answer-postfix">KM</span>
        </div>

        <div className="route-graph-info-container">
          <RouteGraph data={data[Object.keys(data)[0]]} /> {/* you should pass data to child component with your own customized parameters */}
          <RouteGraph data={data[Object.keys(data)[1]]} /> {/* you should pass data to child component with your own customized parameters */}
          <StationInfo /> {/* you should pass data to child component with your own customized parameters */}
        </div>
        
      </div>
    </div>
  )
}

export default App
