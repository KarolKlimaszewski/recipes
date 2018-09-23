import React from "react";

export class RecipeListEmpty extends React.Component {
    render() {
        return (
                <div className="recipe">
                    Your recipes list is empty. Maybe it's time to add some recipes? :)
                </div>
        );
    }
}