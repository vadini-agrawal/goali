import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./serviceWorker.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//   }).catch(function(err) {
//     //registration failed :(
//     console.log('ServiceWorker registration failed: ', err);
//   });
// } else {
//   console.log('No service-worker on this browser');
// }