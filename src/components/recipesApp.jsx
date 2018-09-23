import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase';

import {Header} from "./header.jsx";
import {RecipeForm} from "./recipeForm.jsx";
import {RecipeListEmpty} from "./recipeListEmpty.jsx";
import {Loader} from "./loader.jsx";
import {Recipes} from "./recipes.jsx";


export class RecipesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        let ref = firebase.database().ref();
        ref.on("value", snapshot => {
            if (snapshot.val()) {
                const recipes = snapshot.val().recipes;
                let recipesArr = [];

                for (let id in recipes) {
                    recipes[id].id = id;
                    recipesArr = [...recipesArr, recipes[id]]
                }
                this.setState({
                    recipes: recipesArr,
                    loaded: true
                });
            }
        })
    }

    render() {
        if (this.state.loaded) {
            if (this.state.recipes.length >= 1) {
                return (
                    <div className={"container"}>
                        <Header/>
                        <Recipes/>
                        <RecipeForm />
                    </div>
                )
            }
            else {
                return (
                    <div className={"container"}>
                        <Header/>
                        <RecipeListEmpty />
                        <RecipeForm />
                    </div>
                )
            }
        }
        else {
            return <Loader />
        }
    }
}
