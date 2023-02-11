import "./App.css";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Login from "./sections/Login";
import Menu from "./sections/Menu";
import Signup from "./sections/Signup";
import PostsSection from "./sections/PostsSection";
import {
  Routes,
  Route,
} from "react-router-dom";
import People from "./sections/People";
import Profile from "./sections/Profile";

import Requests from "./sections/Requests";
import Postupload from "./sections/Postupload";
import PostPreview from "./sections/PostPreview";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import socket from "./utils/socket-io";
import { useEffect, useState ,useContext } from "react";
import Notifications from "./sections/Notifications";
import { UserContext } from "./context/Context";
import FloatingNotification from "./components/FloatingNotification";
import Home from "./sections/Home";


function App() {

  const [Toast, setToast] = useState({
    display:false,
    payload:{}
  })
  // const [position, setposition] = useState(0);

  const {user} = useContext(UserContext)

  // useEffect(() => {
    
  //   socket.on("receive-notification", (payload) => {
  
  //     if (payload.receiver._id===user._id){
  //       setToast({
  //         display:true,
  //         payload
  //       })
  
  //     }
  //   })
  // }, [user])
  

  return (

    
    <div className="">
    {
      Toast.display?
      <FloatingNotification Toast={Toast} setToast={setToast} position={window.pageYOffset}/>:
      <p className="hidden"></p>
    }

      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <Home/>
        } />


        <Route path="/feed" element={
          <div>
            <Navbar />
            <div className="main-container md:grid grid-cols-5 gap-2">
              <Menu />

              <div>
                <Postupload />
                <PostsSection />
              </div>

              <People />
            </div>
          </div>
        } />

        <Route path="/profile/:id" element={
          <div>
            <Navbar />
            <Profile />
          </div>
        } />

        <Route path="/requests" element={
          <div>
            <Navbar />
            <Requests />
          </div>
        } />

        <Route path="/post/:id" element={
          <div>
            <Navbar />

            <PostPreview />
          </div>
        } />

        <Route path="/notifications" element={<Notifications />} />

      </Routes>

      <ToastContainer hideProgressBar={true} autoClose={3000} position='top-center' />


    </div>

  );
}

export default App;
