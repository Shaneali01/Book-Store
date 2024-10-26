import Navbar from './Components/Navbar'
import Footer from './Components/footer'
import Home from './Navitems/Home'
import About from './Navitems/About'
import Course from './Navitems/Course'
import Contact from './Navitems/Contact'
import {Route, Routes} from 'react-router-dom'
import SIgnup from './SIgnup'
import { ToastContainer } from 'react-toastify'
import Checkout from './Checkout'
import ScrollToTop from './ScrollTop'
function App() {

  return (
    <>
    <ToastContainer/>

   <div className='dark:bg-slate-950 dark:text-white bg-slate-100'>
   <Navbar/>
   <ScrollToTop/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/course' element={<Course/>}/>
    <Route path='/signup' element={<SIgnup/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
    </Routes>
    <Footer/>
   </div>
    </>
  )
}

export default App
