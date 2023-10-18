export const formatFechaParaUser = (fecha) => {
  const fechaReserva = new Date(`${fecha} 00:00:00`)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  }
  const fechaFormateada = fechaReserva.toLocaleDateString('es-UY', options)
  if (fechaReserva instanceof Date && fechaFormateada !== 'Invalid Date') {
    return fechaFormateada
  } else {
    return ''
  }
}
