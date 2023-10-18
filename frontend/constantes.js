export const baseUrl = import.meta.env.PROD
  ? 'https://tus-finanzas.vercel.app'
  : 'http://localhost:4000'
export const ACTIONS = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}
