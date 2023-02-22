import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'

import {Home} from './pages/Home/Home';
import {Edit} from './pages/Edit/Edit'
import {Register} from './pages/Register/Register'
import {Profile} from './pages/Profile/Profile'


import {Header} from './components/header/Header'

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/userProfile/:id' element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
