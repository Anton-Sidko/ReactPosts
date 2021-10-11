import React from "react";

import './post-list-item.sass';

const PostListItem = (props) => {
    const {
            label,
            important,
            like,
            onDelete,
            changeStatus} = props;

    let classNames = 'app-list-item d-flex justify-content-between';
    if (important) {
        classNames += ' important';
    }
    if (like) {
        classNames += ' like';
    }

    return (
        <div className={classNames}>
            <span
                className="app-list-item-label"
                onClick={changeStatus}
            >
                {label}
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button
                    className="btn-star btn-sm"
                    type="button"
                    onClick={changeStatus}
                >
                    <i className="fa fa-star"></i>
                </button>
                <button
                    className="btn-trash btn-sm"
                    type="button"
                    onClick={onDelete}
                >
                    <i className="fa fa-trash"></i>
                </button>
                <i className="fa fa-heart" ></i>
            </div>
        </div>
    )
}

export default PostListItem;