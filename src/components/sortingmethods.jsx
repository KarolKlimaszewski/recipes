import React from 'react';
import * as firebase from 'firebase';
import {checkboxes} from "./checkboxes";

export class SortingMethods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySorting: "flex",
            recipes: this.props.handleReadRecipes,
            categoryFilter: [],
            sortedRecipes: [],
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

    handleCategoryChange = (event) => {
        if (this.state.categoryFilter.includes(event.target.value)) {
            let categoryArray = [...this.state.categoryFilter];
            let index = categoryArray.indexOf(event.target.value);
            categoryArray.splice(index, 1);
            this.setState({
                categoryFilter: categoryArray
            })
        } else {
            this.setState({
                categoryFilter: [...this.state.categoryFilter, event.target.value],
            })
        }
    }

    handleShowSorting = () => {
        if (this.state.displaySorting === "none") {
            this.setState({
                displaySorting: "flex"
            })
        } else {
            this.setState({
                displaySorting: "none"
            })
        }
    }

    // handleLaunchFilters = () => {
    //     let recipesArr = [];
    //     let recipesCategories = this.state.recipes.map((el) => {
    //         recipesArr.push(el.category);
    //     })
    //     let categoriesToggled = this.state.categoryFilter.map((cat) => {
    //         if(recipesArr.includes(cat)) {
    //             console.log("includes")
    //         }
    //         return cat;
    //     })
    // }

    render() {
        let checkbox = checkboxes.map((el, i) => {
            return <div key={"sortCheckbox" + i} className={"sort__checkbox-container"}>
                <input className="sort__checkbox" id={el.sortValue} type="checkbox" value={el.value}
                       onChange={this.handleCategoryChange}/>
                <label className={"sort__label"} htmlFor={el.sortValue}>{el.name}</label>
            </div>
        });
        if (this.state.displaySorting === "none") {
            return (
                <div className={"sort"}>
                    <button className="sort__show" onClick={this.handleShowSorting}>Show filters</button>
                </div>
            );
        } else {
            return (
                <div className={"sort"}>
                    <button className="sort__show" onClick={this.handleShowSorting}>Hide filters</button>
                    <h2 className="sort__title">
                        Category:
                    </h2>
                    <div className="sort__checkboxes">
                        {checkbox}
                    </div>
                    <button className="sort__run" onClick={this.handleLaunchFilters}>Launch sorting methods</button>
                </div>
            )
        }
    }
}