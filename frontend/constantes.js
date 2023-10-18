export const baseUrl = import.meta.env.PROD
  ? 'https://lista-tareas-app.vercel.app'
  : 'http://localhost:4000'
export const ACTIONS = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}
