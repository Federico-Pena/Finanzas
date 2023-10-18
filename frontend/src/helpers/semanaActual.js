export const semanaActual = () => {
  const today = new Date()
  const inicio = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  ).toDateString()
  const fin = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay())
  ).toDateString()
  return {
    inicio,
    fin
  }
}
