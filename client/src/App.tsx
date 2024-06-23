import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import useRoutes from './hooks/useRoutes'

function App() {
  const routes: JSX.Element = useRoutes();

  return (
    <>
      <Router>{routes}</Router>
    </>
  )
}

export default App
