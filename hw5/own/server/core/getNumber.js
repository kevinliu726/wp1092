let number

const getNumber = (forceRestart = false) => {
  if(forceRestart || number === undefined){
    number = Math.ceil(Math.random() * 100);
  }
  return number
}

const getNumber2 = () => {
  return number
}

export { getNumber, getNumber2}
