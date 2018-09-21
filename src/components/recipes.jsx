import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase';

import {Header} from "./header.jsx";

export class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loaded: false,
            form: {},
            title: "",
            ingredients: "",
            photo: "",
            recipeSteps: "",
            category: "red",
            addRecipeDisplay: "flex"
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
        if(this.state.addRecipeDisplay === "none"){
            this.setState({
                addRecipeDisplay: "flex"
            })
        }
        else{
            this.setState({
                addRecipeDisplay: "none"
            })
        }
    }

    //FORM

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleIngredientsChange = (event) => {
        this.setState({
            ingredients: event.target.value
        })
    }


    handlePhotoUrlChange = (event) => {
        this.setState({
            photo: event.target.value
        })
    }


    handleRecipeStepsChange = (event) => {
        this.setState({
            recipeSteps: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let recipesRef = firebase.database().ref("recipes");
        console.log(recipesRef);
        recipesRef.push({
                ingredients: this.state.ingredients,
                photo: "this.state.photo,",
                RecipeSteps: "this.state.RecipeSteps",
                title: "this.state.title",
                category: "red"
            });
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
                    <div className="recipe__row-edit">
                        <button className="recipe__edit">Edit</button>
                        <button className="recipe__delete">Delete</button>
                    </div>
                </div>

            })
            if (this.state.recipes.length >= 1) {
                return (
                    <div className={"container"}>
                        <Header/>
                        {recipes}
                        <button className="recipe__add" onClick={this.handleAddRecipe}>+</button>
                        <form className="recipe__form" style={{display: this.state.addRecipeDisplay}}>
                            <p className="recipe__form-description">
                                Your recipe title:
                            </p>
                            <input className={"recipe__form-input"} type="text" placeholder={"Title..."}
                                   value={this.state.title}
                                   onChange={this.handleTitleChange}/>
                            <p className="recipe__form-description">
                                Ingredients:
                            </p>
                            <input className={"recipe__form-input"} type="text" placeholder={"ingredients..."}
                                   value={this.state.ingredients}
                                   onChange={this.handleIngredientsChange}/>
                            <p className="recipe__form-description">
                                Photo Url:
                            </p>
                            <input className={"recipe__form-input"} type="text" placeholder={"Your photo URL..."}
                                   value={this.state.photo}
                                   onChange={this.handlePhotoUrlChange}/>
                            <p className="recipe__form-description">
                                Recipe steps:
                            </p>
                            <input className={"recipe__form-input"} type="text" placeholder={"Recipe steps..."}
                                   value={this.state.recipeSteps}
                                   onChange={this.handleRecipeStepsChange}/>

                            <button type={"submit"} className={"addUser__submit"} onClick={this.handleSubmit}>
                                Submit
                            </button>
                        </form>
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
                    <form className="recipe__form" style={{display: this.state.addRecipeDisplay}}>
                        <input className={"recipe__form-input"} type="text" placeholder={"Title..."}
                               value={this.state.title}
                               onChange={this.handleTitleChange}/>
                        <input className={"recipe__form-input"} type="text" placeholder={"ingredients..."}
                               value={this.state.ingredients}
                               onChange={this.handleIngredientsChange}/>
                        <button type={"submit"} className={"addUser__submit"} onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            )
        }
    }
}
