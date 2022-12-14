import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotIndex/SpotIndex";
import SingleSpot from "./components/SingleSpot/SingleSpot";
import MySpotsIndex from "./components/MySpotsIndex/MySpotsIndex";
import MyReviewsIndex from "./components/MyReviewsIndex/MyReviewsIndex";
import UserProfile from "./components/UserProfile/UserProfile";

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
                    <Route path="/my_spots">
                        <MySpotsIndex />
                    </Route>
                    <Route exact path='/spots/:id'>
                        <SingleSpot />
                    </Route>
                    <Route path="/my_reviews">
                        <MyReviewsIndex />
                    </Route>
                    <Route path="/profile">
                        <UserProfile />
                    </Route>
                    <Route>
                        <h1 style={{ textAlign: 'center' }}>404 Not Found!</h1>
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
