import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { lightTheme, darkTheme } from './themes';
import { GlobalStyles } from './global';
import { ThemeProvider } from 'styled-components';

//Components 
import { Navibar } from './components/Navibar';

//Pages 
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
//import styled from 'styled-components';


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
          <Route exact path="/login" component={login}/>
          <Route exact path="/signup" component={signup}/>
        </Switch>
        </div>
      </Router> 
      </ThemeProvider>
    </div>
  );
}

export default App;
