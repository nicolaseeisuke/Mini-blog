import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import {useState, useEffect} from 'react'
import { UseAuthentication } from './hooks/UseAuthentication ';
// context
import { AuthContextProvider } from './context/AuthContext';

//components
import NavBar from './components/NavBar';
import Footer from './components/Footer';


//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = UseAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthContextProvider value={{user}}>
      <BrowserRouter>
      <NavBar/>
        <div className="container"> 
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/posts/create' element={<CreatePost/>}/>
            <Route path='/dashboard' element={<Dashboard/>} /> 
          </Routes>
        </div>     
        <Footer/>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
