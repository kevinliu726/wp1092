import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/start')

    return msg
  } catch(error) {
    return "Server not responding or not connected!"
  }
}

const guess = async (number) => {
  try {
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg
  } catch(error) {
    if(error.response !== undefined) {
      return error.response.data.msg
    } else {
      return "Server not responding or not connected!"
    }
  }
}

const restart = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/restart')
    return msg
  } catch(error) {
    return "Server not responding or not connected!"
  }
}

export { startGame, guess, restart }
