import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import MainPage from './components/Page/MainPage'
import Admin from './components/Admin/Admin'
import NotFound from './components/NotFound/NotFound'
import Footer from './components/Footer/Footer'
import {checkSession, checkInterval} from './util/session/session'

let cantInterval = []

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const interval = checkSession(dispatch, navigate)
  cantInterval = checkInterval(cantInterval, interval)
  console.log(cantInterval)
  

  return (
    <div className='app--container'>
      <Routes>
        <Route path="/*" element={<MainPage />}>
            {/* <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} /> */}
        </Route>
        <Route path="admin/*" element={<Admin />} > </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
