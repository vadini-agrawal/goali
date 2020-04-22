import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { lightTheme, darkTheme } from './util/themes';
import { GlobalStyles } from './util/global';
import { ThemeProvider } from 'styled-components';
import jwtDecode from 'jwt-decode';

//Components 
import Navibar from './components/Navibar';
import AuthRoute from './util/AuthRoute';

//Pages 
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
//import styled from 'styled-components';

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Router> 
        <Navibar/>
        <div className = "container">
        <Switch> 
          <Route exact path="/" component={home}/>
          <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
          <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
        </Switch>
        </div>
      </Router> 
      </ThemeProvider>
    </div>
  );
}

export default App;
