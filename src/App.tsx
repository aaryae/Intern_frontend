
import Footer from '@components/footer/Footer'
import Home from 'pages/Home'
import Login from 'pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
