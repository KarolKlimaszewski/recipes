import React from "react";

import * as firebase from 'firebase';
import {checkboxes} from './checkboxes.js';

export class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            ingredients: "",
            photo: "",
            recipeSteps: "",
            category: [],
            displayForm: "none"
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
            category: [],
            displayForm: "none"

        })
    }

    handleCheckboxChange = (event) => {
        if (this.state.category.includes(event.target.value)) {
            let categoryArray = [...this.state.category];
            let index = categoryArray.indexOf(event.target.value);
            categoryArray.splice(index, 1);
            this.setState({
                category: categoryArray
            })
        } else {
            this.setState({
                category: [...this.state.category, event.target.value],
            })
        }
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
        let checkbox = checkboxes.map((el, i) => {
            return <div key={"checkbox" + i} className={"form__checkbox-container"}>
                <input className="form__checkbox" id={el.name} type="checkbox" value={el.value}
                       onChange={this.handleCheckboxChange}/>
                <label className={"form__label"} htmlFor={el.name}>{el.name}</label>
            </div>
        })
        return (<div>
                <button className="recipe__add" onClick={this.handleFormDisplay}>+</button>
                <form className="form" style={{display: this.state.displayForm}}>
                    <p className="form__description">
                        Your recipe title:
                    </p>
                    <input className={"form__input"} type="text" placeholder={"Title..."}
                           value={this.state.title}
                           onChange={this.handleTitleChange}/>
                    <p className="form__description">
                        Category:
                    </p>
                    <div className="form__checkboxes">
                        {checkbox}
                    </div>
                    <p className="form__description">
                        Ingredients (separate them with a semicolon):
                    </p>
                    <input className={"form__input"} type="text" placeholder={"Ingredients..."}
                           value={this.state.ingredients}
                           onChange={this.handleIngredientsChange}/>
                    <p className="form__description">
                        Photo Url:
                    </p>
                    <input className={"form__input"} type="text" placeholder={"Your photo URL..."}
                           value={this.state.photo}
                           onChange={this.handlePhotoUrlChange}/>
                    <p className="form__description">
                        Recipe steps (separate them with a semicolon):
                    </p>
                    <input className={"form__input"} type="text" placeholder={"Recipe steps..."}
                           value={this.state.recipeSteps}
                           onChange={this.handleRecipeStepsChange}/>
                    <button type={"submit"} className={"form__submit"} onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}