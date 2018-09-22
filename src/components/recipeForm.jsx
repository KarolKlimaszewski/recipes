import React from "react";

import * as firebase from 'firebase';

export class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            ingredients: "",
            photo: "",
            recipeSteps: "",
            category: [],
            displayForm: "flex"
        }
    }

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
        recipesRef.push({
            ingredients: this.state.ingredients.split(";"),
            photo: this.state.photo,
            recipeSteps: this.state.recipeSteps.split(";"),
            title: this.state.title,
            category: this.state.category
        });
        this.setState({
            title: "",
            ingredients: "",
            photo: "",
            recipeSteps: "",
            category: "",
            displayForm: "none"

        })
    }

    handleFormDisplay = () => {
        if (this.state.displayForm === "none") {
            this.setState({
                displayForm: "flex"
            })
        } else {
            this.setState({
                displayForm: "none"
            })
        }
    }


    render() {
        const checkboxes = [
            {
                name: 'snack',
                value: 'snack',
            },
            {
                name: 'breakfast',
                value: 'breakfast',
            },
            {
                name: 'dessert',
                value: 'dessert',
            },
            {
                name: 'dinner',
                value: 'dinner',
            },
            {
                name: 'drink',
                value: 'drink',
            },
    ];
        let checkbox = checkboxes.map(function (el) {
            return <div>
                <input className="recipe__form-checkbox" id={el.name} type="checkbox" value={el.value}/>
                <label htmlFor={el.name}>{el.value}</label>
            </div>
        })
        return (<div>
                <button className="recipe__add" onClick={this.handleFormDisplay}>+</button>
                <form className="recipe__form" style={{display: this.state.displayForm}}>
                    <p className="recipe__form-description">
                        Your recipe title:
                    </p>
                    <input className={"recipe__form-input"} type="text" placeholder={"Title..."}
                           value={this.state.title}
                           onChange={this.handleTitleChange}/>
                    <p className="recipe__form-description">
                        Category:
                    </p>
                    <div className="recipe__form-checkboxes">
                        {checkbox}
                    </div>
                    <p className="recipe__form-description">
                        Ingredients (separate them with a semicolon):
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
                        Recipe steps (separate them with a semicolon):
                    </p>
                    <input className={"recipe__form-input"} type="text" placeholder={"Recipe steps..."}
                           value={this.state.recipeSteps}
                           onChange={this.handleRecipeStepsChange}/>
                    <button type={"submit"} className={"addUser__submit"} onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}