import app from 'firebase/app';
require('firebase/auth');

const config = {
    apiKey: "AIzaSyBEBsq4qsEay8jCwSU5OzL5FzHcq1OCV2g",
    authDomain: "goali-94346.firebaseapp.com",
    databaseURL: "https://goali-94346.firebaseio.com",
    projectId: "goali-94346",
    storageBucket: "goali-94346.appspot.com",
    messagingSenderId: "464411671416",
    appId: "1:464411671416:web:edd6379ce0ffbe318f668d",
    measurementId: "G-51V6GBZJB4"
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }
}

export default Firebase;