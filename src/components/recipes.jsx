import React from 'react';
import ReactDOM from 'react-dom';

import {Header} from "./header.jsx";

export class Recipes extends React.Component {
   constructor(props){
     super(props);

   }
   render() {
     return (
         <div className={"container"}>
             <Header />

         </div>
     )
   }
 }
