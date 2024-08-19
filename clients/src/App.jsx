import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import DashBoard from "./Pages/DashBoard"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import PrivateRoute from "./Components/PrivateRoute"
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="about" element={<About />}/>
        <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<DashBoard />}/>
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  )
}