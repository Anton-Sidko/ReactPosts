import React from "react";

import './search-panel.sass';

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchItem: ''
        }
    }

    onUpdateSearch= (event) => {
        const searchItem = event.target.value;
        this.setState({
            searchItem: searchItem
        })
        this.props.onUpdateSearch(searchItem)
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Поиск по записям"
                onChange={this.onUpdateSearch}
                value={this.state.searchItem}
            />
        )
    }
}
