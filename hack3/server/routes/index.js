import { GetStations, CalculateDistance } from './station'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function routes(app) {
  app.get('/api/getStations', wrap(GetStations))
  app.get('/api/calculateDistance', wrap(CalculateDistance))
}

export default routes
