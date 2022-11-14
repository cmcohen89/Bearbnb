import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotIndex/SpotIndex";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import SingleSpot from "./components/SingleSpot/SingleSpot";
import MySpotsIndex from "./components/MySpotsIndex/MySpotsIndex";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm";

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
          <Route exact path='/'>
            <SpotIndex />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/create">
            <CreateSpotForm />
          </Route>
          <Route path="/my_spots">
            <MySpotsIndex />
          </Route>
          <Route exact path='/spots/:id'>
            <SingleSpot />
          </Route>
          <Route exact path='/spots/:id/edit'>
            <EditSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
