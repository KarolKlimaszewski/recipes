import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase';

import {Header} from "./header.jsx";

export class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
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
                    recipes: [...recipesArr],
                    loaded: true
                });
            }
        })
    }

    handleAddRecipe = () => {
        console.log("hello")
    }

    render() {
        if (this.state.loaded) {
            let recipes = this.state.recipes.map(function (el, i) {
                let ingredients = el.ingredients.map(function (ing) {
                    return <p className={"recipe__ingredients-item"}>{ing}</p>
                })
                let recipeSteps = el.recipeSteps.map(function (step) {
                    return <li className="recipe__steps-list-item">{step}</li>
                })
                return <div className={"recipe"} key={i}>
                    <div className="recipe__row">
                        <div className="recipe__category" style={{backgroundColor: el.category}}></div>
                        <h2 className="recipe__title">{el.title}</h2>
                    </div>
                    <div className="recipe__row">
                        <div className="recipe__photo">
                            <img src={el.photo} alt="See this? Please try to update photo address (url)."
                                 className="recipe__img"/>
                        </div>
                        <div className="recipe__text">
                            <h3 className={"recipe__ingredients-title"}>Ingredients:</h3>
                            <div className="recipe__ingredients">{ingredients}</div>
                        </div>
                    </div>
                    <div className="recipe__row">
                        <ul className={"recipe__steps-list"}>
                            {recipeSteps}
                        </ul>
                    </div>
                </div>

            })
            if (this.state.recipes.length >= 1) {
                return (
                    <div className={"container"}>
                        <Header/>
                        {recipes}
                        <button className="recipe__add">+</button>
                    </div>
                )
            }
        }
        else {
            return (
                <div className={"container"}>
                    <Header/>
                    <div className="recipe">
                        Your recipes list is empty. Maybe it's time to add some recipes? :)
                    </div>
                    <button className="recipe__add" onClick={this.handleAddRecipe}>+</button>

                </div>
            )
        }
    }
}
