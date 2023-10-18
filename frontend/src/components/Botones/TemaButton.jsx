import { Luna } from '../Icons/Luna'
import { Sol } from '../Icons/Sol'
import './TemaButton.css'
const TemaButton = ({ isDarkMode, toggleColorScheme }) => {
  return (
    <div className='btnColorTema'>
      <button
        className={`btnTema ${isDarkMode ? 'isDark' : 'isLight'}`}
        type='button'
        title='Cambiar tema'
        onClick={toggleColorScheme}>
        <span>{isDarkMode ? <Sol /> : <Luna />}</span>
      </button>
    </div>
  )
}
export default TemaButton
