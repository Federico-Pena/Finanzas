import { useContext, useEffect } from 'react'
import { UserContext } from './Context/UserContext'
import Dashboard from './Pages/Transactions/Transactions'
import { FormLoginRegister } from './components/FormLoginRegister/FormLoginRegister'
import './App.css'
import TemaButton from './components/Botones/TemaButton'
import { TransactionProvider } from './Context/TransactionContext'
import { User } from './components/Icons/User'
function App() {
  const { user, toggleTheme, theme, logoutUser, deleteUser } = useContext(UserContext)

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <main>
      <TemaButton isDarkMode={theme === 'dark' ? true : false} toggleColorScheme={toggleTheme} />
      <header className='headerBtns'>
        <span>
          <User />
        </span>
        <div className='btns'>
          <button type='button' title='Cerrar Sesión' className='btnLogOut' onClick={logoutUser}>
            Cerrar sesión
          </button>
          <button
            type='button'
            title='Eliminar cuenta'
            className='btnEliminarCuenta'
            onClick={deleteUser}>
            Eliminar Cuenta
          </button>
        </div>
      </header>
      {user ? (
        <TransactionProvider>
          <Dashboard />
        </TransactionProvider>
      ) : (
        <FormLoginRegister />
      )}
    </main>
  )
}

export default App
