import {Header} from "./header.jsx";
import {RecipeForm} from "./recipeForm.jsx";
import React from "react";

export class RecipeListEmpty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={"container"}>
                <Header/>
                <div className="recipe">
                    Your recipes list is empty. Maybe it's time to add some recipes? :)
                </div>
                <RecipeForm />
            </div>
        );
    }
}