import React from 'react';
import ReactDOM from 'react-dom';

require('./scss/main.scss');

import {Recipes} from './components/recipes.jsx';

class App extends React.Component {
   constructor(props){
     super(props);

   }
   render() {
     return (
     <Recipes />
     )
   }
 }

document.addEventListener("DOMContentLoaded", function(){

  ReactDOM.render(
      <App />,
    document.querySelector('#app')
  )

})
