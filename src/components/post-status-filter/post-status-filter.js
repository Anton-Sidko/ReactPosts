import React from "react";

import './post-status-filter.sass';

export default class PostStatusFilter extends React.Component {
    constructor(props) {
        super(props);

        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Избранное'},
        ]
    }

    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {
                filter = 'all',
                onFilterSelect = Function.prototype
            } = this.props;
            const activeBtn = filter === name;
            const classActive = activeBtn ? 'btn-info' : 'btn-outline-secondary'

            return (
                <button
                    key={name}
                    className={`btn ${classActive}`}
                    onClick={() => onFilterSelect(name)}
                >
                    {label}
                </button>
            )
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}




