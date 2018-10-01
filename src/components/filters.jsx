import React from 'react';
import * as firebase from 'firebase';
import {checkboxes} from "./checkboxes";

export class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySorting: "flex",
            recipes: this.props.handleReadRecipes,
            categoryFilter: [],
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

    handleLaunchFilters = () => {
        if (typeof this.props.categories === 'function') {
            this.props.categories({
                categoryFilter: this.state.categoryFilter
            })
        }
    }

    handleClearFilters = () => {
        this.setState({
            categoryFilter: ""
        })
    }

    render() {
        let checkbox = checkboxes.map((el, i) => {
            return <div key={"filterCheckbox" + i} className={"filter__checkbox-container"}>
                <input className="filter__checkbox" id={el.sortValue} type="checkbox" value={el.value}
                       onChange={this.handleCategoryChange}/>
                <label className={"filter__label"} htmlFor={el.sortValue}>{el.name}</label>
            </div>
        });
        if (this.state.displaySorting === "none") {
            return (
                <div className={"filter"}>
                    <button className="filter__show" onClick={this.handleShowSorting}>Show filters</button>
                </div>
            );
        } else {
            return (
                <div className={"filter"}>
                    <button className="filter__show" onClick={this.handleShowSorting}>Hide filters</button>
                    <h2 className="filter__title">
                        Category:
                    </h2>
                    <div className="filter__checkboxes">
                        {checkbox}
                    </div>
                    <button className="filter__run" onClick={this.handleLaunchFilters}>Launch filtering methods</button>
                    <button className="filter__clear" onClick={this.handleClearFilters}>Clear filters</button>
                </div>
            )
        }
    }
}