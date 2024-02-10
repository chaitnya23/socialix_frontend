import { COLORS } from "./utils";
import "./App.css";
import Loader from "./components/Loader";
import { Navbar } from "./components";

import { Routes, Route } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import socket from "./utils/socket-io";
import { useEffect, useState, useContext } from "react";

import { UserContext } from "./context/Context";

import {
  AuthPage,
  HomeContainer,
  PostViewContainer,
  ExploreContainer,
  PeopleContainer,
  ProfileContainer,
  CreatePageContainer,
  FriendsSection,
  RequestsContainer,
} from "./pages";
import { isMobileScreen } from "./utils/lib/app-utils";

function App() {
  const [Toast, setToast] = useState({
    display: false,
    payload: {},
  });

  const { user } = useContext(UserContext);

  return (
    <>
      <div
        className="min-h-screen max-h-fit  md:flex justify-between gap-5"
        style={{ backgroundColor: COLORS.black }}
      >
        {/*friends-section*/}
        <div className="md:w-[18%] p-2 ">
          <Navbar />
        </div>
        <div className="md:w-[75%] ">
          <Routes>
            <Route path="/auth" exact element={<AuthPage />} />
            <Route path="/" exact element={<HomeContainer />} />
            <Route path="/explore" exact element={<ExploreContainer />} />
            <Route path="/people" exact element={<PeopleContainer />} />
            <Route path="/profile/:id" exact element={<ProfileContainer />} />
            <Route path="/post/:id" exact element={<PostViewContainer />} />

            <Route
              path="/create-post"
              exact
              element={<CreatePageContainer />}
            />

            {isMobileScreen() ? (
              <Route path="/friends" exact element={<FriendsSection />} />
            ) : null}
            {isMobileScreen() ? (
              <Route path="/requests" exact element={<RequestsContainer />} />
            ) : null}
          </Routes>
        </div>

        <ToastContainer
          hideProgressBar={true}
          autoClose={2000}
          position="top-center"
        />
      </div>
    </>
  );
}

export default App;
