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
            category: "red"
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
            ingredients: this.state.ingredients.split(","),
            photo: this.state.photo,
            recipeSteps: this.state.recipeSteps.split(","),
            title: this.state.title,
            category: "red"
        });
    }

    render() {
        return (
            <form className="recipe__form" style={{display: this.state.addRecipeDisplay}}>
                <p className="recipe__form-description">
                    Your recipe title:
                </p>
                <input className={"recipe__form-input"} type="text" placeholder={"Title..."}
                       value={this.state.title}
                       onChange={this.handleTitleChange}/>
                <p className="recipe__form-description">
                    Ingredients (separate them with a comma):
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
                    Recipe steps (separate them with a comma):
                </p>
                <input className={"recipe__form-input"} type="text" placeholder={"Recipe steps..."}
                       value={this.state.recipeSteps}
                       onChange={this.handleRecipeStepsChange}/>
                <button type={"submit"} className={"addUser__submit"} onClick={this.handleSubmit}>
                    Submit
                </button>
            </form>
        );
    }
}