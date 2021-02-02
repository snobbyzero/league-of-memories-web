import './App.css';
import React from "react";
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import SignIn from "./login/SignIn";
import Profile from "./profile/Profile";
import CurrentMatch from "./current_match/CurrentMatch";
import SignUp from "./login/SignUp";
import AddSummoner from "./add_summoner/AddSummoner";
import ConfirmSummoner from "./confirm_summoner/ConfirmSummoner";


function App() {
    const pathname = useLocation().pathname;
    const noHeaderArr = ['/signin', '/signup', '/user/summoners', '/user/confirm-summoner']
    // TODO check for tokens and get them if needed

    return (
        <div className="App">
            {
                !noHeaderArr.includes(pathname) ? <Header/> : null
            }
            <main>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/signin' exact component={SignIn}/>
                    <Route path='/signup' exact component={SignUp}/>
                    <Route path='/profile' exact component={Profile}/>
                    <Route path='/current' exact component={CurrentMatch}/>
                    <Route path='/user/summoners' exact component={AddSummoner}/>
                    <Route path='/user/confirm-summoner' exact component={ConfirmSummoner}/>
                </Switch>
            </main>
            {
                !noHeaderArr.includes(pathname) ? <Footer/> : null
            }
        </div>
    );
}

export default App;
