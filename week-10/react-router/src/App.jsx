import './App.css'
import {BrowserRouter,Route,Routes,Link, useNavigate} from 'react-router-dom'


function App() {
  return <div>
      <BrowserRouter>
        <Link to='/'>Main</Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/main/home">Home</Link>
        &nbsp;&nbsp;&nbsp;
        <Link to='/main/about'>about</Link>
        &nbsp;&nbsp;&nbsp;
        <Link to='/main/contact'>contact</Link>
        &nbsp;&nbsp;&nbsp;
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/main/home' element={<Home/>}/>
            <Route path='/main/about' element={<About/>}/>  
            <Route path='/main/contact' element={<Contact/>}/>
          </Routes>
      </BrowserRouter>
  </div>
}
function Main(){
  return <div>
      <h1>main page!</h1>
    </div>
  
}
function Home(){
  return (<div>
      <h1>currently in Home route</h1>
  </div>)
} 
function About(){
  return <>
    <h1>currently in about section!</h1>
  </>
}
function Contact(){
  let navigate=useNavigate();
  function redirectMain(){
    navigate("/")
  }

  return <>
  <button onClick={redirectMain}>back to main</button>
    <h1>In contact</h1>
    </>
}   
export default App
