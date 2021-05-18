import React from 'react'
import StationInfo from './stationInfo'

function Station({station}) {
  let color = '';
  if(station.station_type === 'G') {
    color = 'green';
  } else if(station.station_type === 'R') {
    color = 'red';
  } else if(station.station_type === 'O') {
    color = 'orange';
  } else if(station.station_type === 'B') {
    color = 'blue';
  }
  if(station.distance_to_next === -1) {
    return (
      <div className="station-line-container">
        <div className="station-and-name" id={"s-"+station.station_id}> {/* you should add both id and onClick to attributes */}
          <div className={"station-rectangle "+color+' end'}>{station.station_id}</div>
          <div className="station-name">{station.station_name}</div>
        </div>
      </div>
    )
  } else {
    if(station.station_order === 1) {
      return (
        <div className="station-line-container">
          <div className="station-and-name" id={"s-"+station.station_id}> {/* you should add both id and onClick to attributes */}
            <div className={"station-rectangle "+color+' end'}>{station.station_id}</div>
            <div className="station-name">{station.station_name}</div>
          </div>
          <div className={"line "+color} id={"l-"+station.station_id}></div> {/* you should add both id to attributes */}
        </div>
      )
    } else {
      return (
        <div className="station-line-container">
          <div className="station-and-name" id={"s-"+station.station_id}> {/* you should add both id and onClick to attributes */}
            <div className={"station-rectangle "+color}>{station.station_id}</div>
            <div className="station-name">{station.station_name}</div>
          </div>
          <div className={"line "+color} id={"l-"+station.station_id}></div> {/* you should add both id to attributes */}
        </div>
      )
    }
  }
}

export default Station
