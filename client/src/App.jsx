import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Edit from './pages/Edit/Edit'
import Profile from './pages/Profile/Profile'
import { Routes, Route } from 'react-router-dom'
import Paginations from './components/Paginations/Paginations'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/register' element={ <Register/>} />
        <Route path='/edit/:id' element={ <Edit/>} />
        <Route path='/userprofile/:id' element={ <Profile/>} />
      </Routes>
    </>
  )
}

export default App
