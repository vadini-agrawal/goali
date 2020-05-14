import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { lightTheme, darkTheme } from './util/themes';
import { GlobalStyles } from './util/global';
import { ThemeProvider } from 'styled-components';
import jwtDecode from 'jwt-decode';
import { withFirebase } from './components/Firebase';

//Redux 
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData, refreshToken } from './redux/actions/userActions'; 

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



export class App extends Component {
  // this.state = {
  //   authUser: null,
  // };
  // componentDidMount = () => {
  //   this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
  //     authUser 
  //      ? 
  //         console.log("HIIIIIIIIII WHATS UP WITH YALLLLL WE LOGGING IN")
       
  //      : console.log("HIIIIIIIIII WHATS UP WITH YALLLLL WE NOT LOGGING IN")
  //   });
  //   console.log("COMPONENT MOUNTAINNGNGNGNGNNGNGNGNG");
  // };
  // componentWillUnmount = () => {
  //   this.listener();
  // };

    
  render () {
    axios.defaults.baseURL = "https://us-central1-goali-94346.cloudfunctions.net/api";

    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        console.log("YOU ARE LOGGEEDDDDD OUT ");
        // window.location.href = '/login'
      // } else if (decodedToken.exp * 1000 - Date.now() < 10000) {
      //   const user = this.props.firebase.auth.verifyIdToken(token)
      //     .then(decodedToken => {
      //                   // console.log(decodedToken);
      //       return decodedToken;
      //     })
      //     .catch(err => {
      //       console.error('Error while verifying token', err);
      //     });
      //   const newToken = this.props.firebase.auth.user.getIdToken(true)
      //     .then((token) => {
      //         return token;
      //     })
      //     .catch(err => {
      //         console.log(err);
      //     })
      //   store.dispatch({type: SET_AUTHENTICATED});
      //   axios.defaults.headers.common['Authorization'] = newToken;
      //   store.dispatch(getUserData());
      //   console.log("UPDATED THE TOKEN WOOOOOOOOOOOOOOOOOO");
      }  else {
        // const user = this.props.firebase.auth.verifyIdToken(token)
        //   .then(decodedToken => {
        //                 // console.log(decodedToken);
        //     return decodedToken;
        //   })
        //   .catch(err => {
        //     console.error('Error while verifying token', err);
        //   });
        // const newToken = this.props.firebase.auth().user.getIdToken(true)
        //   .then((token) => {
        //       return token;
        //   })
        //   .catch(err => {
        //       console.log(err);
        //   })
        // store.dispatch({type: SET_AUTHENTICATED});
        // axios.defaults.headers.common['Authorization'] = newToken;
        // store.dispatch(getUserData());
        // console.log("UPDATED THE TOKEN WOOOOOOOOOOOOOOOOOO");
        
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
      }
    }
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
}

export default withFirebase(App);
