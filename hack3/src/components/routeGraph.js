import React from 'react'
import Station from './station'

function RouteGraph({data}) {
  console.log(data)
  return (
    <div className="route-graph-container">
      {
        data.map((element) => (<Station station = {element}/>))
      }
    </div>
  )
}

export default RouteGraph
