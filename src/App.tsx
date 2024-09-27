import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Order from './pages/Order/Order'
import Login from './pages/Auth/Login'
import Signin from './pages/Auth/Signin'
import Item from './pages/Item/Item'
import ItemCategory from './pages/ItemCategory/ItemCategory'
import Stock from './pages/Stock/Stock'
import CreateOrder from './pages/Order/CreateOrder'

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/item' element={<Item/>}/>
          <Route path='/category' element={<ItemCategory/>}/>
          <Route path='/stock' element={<Stock/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/order/create' element={<CreateOrder/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
