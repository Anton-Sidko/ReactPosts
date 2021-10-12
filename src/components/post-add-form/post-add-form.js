import React from "react";

import './post-add-form.sass';

export default class PostAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    onValueChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const post = this.state.text;
        const {onAdd} = this.props;

        if (post) {
            onAdd(post);
        }

        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit={this.handleSubmit}
            >
                <input
                    type="text"
                    className="form-control new-post-label"
                    placeholder="О чем вы думаете сейчас?"
                    onChange={this.onValueChange}
                    value={this.state.text}
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary"
                >
                    Добавить
                </button>
            </form>
        )
    }
}
