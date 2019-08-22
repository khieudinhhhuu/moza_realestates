import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAWFz3-kNuHrAN3yIzWw0z2CuNHNQPMJAQ",
  authDomain: "mozarealestates-66e84.firebaseapp.com",
  databaseURL: "https://mozarealestates-66e84.firebaseio.com",
  projectId: "mozarealestates-66e84",
  storageBucket: "mozarealestates-66e84.appspot.com",
  messagingSenderId: "1086487055983",
  appId: "1:1086487055983:web:42d776e05daec1cb"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);