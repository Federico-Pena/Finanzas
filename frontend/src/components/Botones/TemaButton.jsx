import { Luna } from '../Icons/Luna'
import { Sol } from '../Icons/Sol'
import './TemaButton.css'
const TemaButton = ({ isDarkMode, toggleColorScheme }) => {
  return (
    <span
      className={`btnTema ${isDarkMode ? 'isDark' : 'isLight'}`}
      type='button'
      title='Cambiar tema'
      onClick={toggleColorScheme}>
      {isDarkMode ? <Sol /> : <Luna />}
    </span>
  )
}
export default TemaButton
