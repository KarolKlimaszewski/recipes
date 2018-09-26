import React from "react";

import * as firebase from 'firebase';

export class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            active: -1,
            showRecipe: "none"
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
                    recipes: recipesArr
                });
            }
        })
    }

    handleSendRecipes = () => {
        let recipes = this.state.recipes;
        this.props.handleReadRecipes(recipes);
    }

    handleShowRecipe = (e, index) => {
        if (this.state.showRecipe === "none") {
            this.setState({
                activeRecipe: index,
                showRecipe: "flex"
            })
        } else {
            this.setState({
                activeRecipe: -1,
                showRecipe: "none"
            })
        }
    }

    handleDeleteElement = (e, index) => {
        e.preventDefault();
        const refDelete = firebase.database().ref("recipes/" + index.id);
        refDelete.remove();
        this.setState({
            activeRecipe: -1
        })
    }

    render() {
        let recipes = this.state.recipes.map((el, i) => {
            let ingredients = el.ingredients.map((ing, i) => {
                return <p key={"ingredient" + i} className={"recipe__ingredients-item"}>{ing}</p>
            })
            let recipeSteps = el.recipeSteps.map((step, i) => {
                return <li key={"recipeStep" + i} className="recipe__steps-list-item">{step}</li>
            })
            let categories = el.category.map(cat => {
                if (cat === "snack") {
                    return <div className="recipe__category" style={{backgroundColor: "red"}}>{cat}</div>
                } else if (cat === "breakfast") {
                    return <div className="recipe__category" style={{backgroundColor: "green"}}>{cat}</div>
                } else if (cat === "dinner") {
                    return <div className="recipe__category" style={{backgroundColor: "blue"}}>{cat}</div>
                } else if (cat === "dessert") {
                    return <div className="recipe__category" style={{backgroundColor: "yellow"}}>{cat}</div>
                } else {
                    return <div className="recipe__category" style={{backgroundColor: "brown"}}>{cat}</div>
                }
            })
            if (this.state.activeRecipe === el) {
                return <div className={"recipe"} key={"recipe" + i}>
                    <div className="recipe__row--main">
                        <div className="recipe__show" onClick={e => this.handleShowRecipe(e, el)}>Hide</div>
                        <div className="recipe__categories">{categories}</div>
                        <h2 className="recipe__title">{el.title}</h2>
                    </div>
                    <div className="recipe__row" style={{display: this.state.showRecipe}}>
                        <div className="recipe__photo">
                            <img src={el.photo} alt="See this? Please try to update photo address (url)."
                                 className="recipe__img"/>
                        </div>
                        <div className="recipe__text">
                            <h3 className={"recipe__ingredients-title"}>Ingredients:</h3>
                            <div className="recipe__ingredients">{ingredients}</div>
                        </div>
                    </div>
                    <div className="recipe__row" style={{display: this.state.showRecipe}}>
                        <ul className={"recipe__steps-list"}>
                            {recipeSteps}
                        </ul>
                    </div>
                    <div className="recipe__row recipe__row-edit" style={{display: this.state.showRecipe}}>
                        <button className="recipe__delete" onClick={e => this.handleDeleteElement(e, el)}>Delete
                        </button>
                    </div>
                </div>
            } else {
                return <div className={"recipe"} key={"recipe" + i}>
                    <div className="recipe__row--main">
                        <div className="recipe__show" onClick={e => this.handleShowRecipe(e, el)}>Show</div>
                        <div className="recipe__categories">{categories}</div>
                        <h2 className="recipe__title">{el.title}</h2>
                    </div>
                    <div className="recipe__row" style={{display: "none"}}>
                        <div className="recipe__photo">
                            <img src={el.photo} alt="See this? Please try to update photo address (url)."
                                 className="recipe__img"/>
                        </div>
                        <div className="recipe__text">
                            <h3 className={"recipe__ingredients-title"}>Ingredients:</h3>
                            <div className="recipe__ingredients">{ingredients}</div>
                        </div>
                    </div>
                    <div className="recipe__row" style={{display: "none"}}>
                        <ul className={"recipe__steps-list"}>
                            {recipeSteps}
                        </ul>
                    </div>
                    <div className="recipe__row recipe__row-edit" style={{display: "none"}}>
                        <button className="recipe__delete" onClick={e => this.handleDeleteElement(e, el)}>Delete
                        </button>
                    </div>
                </div>
            }
        })
        return <div className={"recipes"}>{recipes}</div>
    }
}