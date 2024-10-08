import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import DashBoard from "./Pages/DashBoard"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import PrivateRoute from "./Components/PrivateRoute"
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute"
import CreatePost from "./Pages/CreatePost"
import UpdatePost from "./Pages/UpdatePost"
import PostPage from "./Pages/PostPage"
import ScrollToTop from "./Components/ScrollToTop"
import Search from "./Pages/Search"
export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashBoard />}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
        <Route path="/create-post" element={<CreatePost />}/>
        <Route path="/update-post/:postId" element={<UpdatePost />}/>
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  )
}