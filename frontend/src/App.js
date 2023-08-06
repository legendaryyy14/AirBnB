import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SpotDetail from "./components/SpotDetail"
import CreateSpotForm from "./components/CreateSpotForm";
import ManageSpots from "./components/ManageSpots"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route path="/spots/current">
            <ManageSpots />
          </Route>
          <Route path="/spots">
            <CreateSpotForm />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
