import React from 'react';

export class SortingMethods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySorting: "none"
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

    render() {
        if(this.state.displaySorting === "none") {
            return (
                <div className={"sort"}>
                    <h2 className="sort__title">
                        Sort by:
                    </h2>
                    <button className="sort__show" onClick={this.handleShowSorting}>Show</button>
                </div>
            );
        }else{
            return (
                <div className={"sort"}>
                    <h2 className="sort__title">
                        Sort by:
                    </h2>
                    <button className="sort__show" onClick={this.handleShowSorting}>Hide</button>
                    blablabla
                </div>
            )
        }
    }
}