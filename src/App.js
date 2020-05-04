import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { lightTheme, darkTheme } from './util/themes';
import { GlobalStyles } from './util/global';
import { ThemeProvider } from 'styled-components';
import jwtDecode from 'jwt-decode';

//Redux 
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions'; 

//Components 
import Navibar from './components/Navibar';
import AuthRoute from './util/AuthRoute';

//Pages 
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import axios from 'axios';
//import styled from 'styled-components';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Provider store={store}>
        <Router> 
          <Navibar/>
          <div className = "container">
          <Switch> 
            <Route exact path="/" component={home}/>
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup} />
            <Route exact path="/users/:handle" component={user}/>
            <Route exact path="/users/:handle/update/:updateId" component={user}/>
          </Switch>
          </div>
        </Router> 
      </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
