import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBsjlucrZLMrrp5eVL2HmFIWntgmEz3QwY",
    authDomain: "recipesreact.firebaseapp.com",
    databaseURL: "https://recipesreact.firebaseio.com",
    projectId: "recipesreact",
    storageBucket: "recipesreact.appspot.com",
    messagingSenderId: "19833174599"
};
firebase.initializeApp(config);

require('./scss/main.scss');

import {RecipesApp} from './components/recipesApp.jsx';

class App extends React.Component {
   constructor(props){
     super(props);

   }
   render() {
     return (
     <RecipesApp />
     )
   }
 }

document.addEventListener("DOMContentLoaded", function(){

  ReactDOM.render(
      <App />,
    document.querySelector('#app')
  )

});
