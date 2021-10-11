import React from "react";

import PostListItem from '../post-list-item';
import './post-list.sass';

const PostList = ({ posts,
                    onDelete = Function.prototype,
                    changeStatus = Function.prototype }) => {

    const elements = posts.map(item => {
        const {
            id,
            ...itemProps
        } = item;

        return (
            <li className="list-group-item" key={id}>
                <PostListItem
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    changeStatus={(event) => changeStatus(id, event)}
                />
            </li>
        )
    });

    return (
        <ul className="app-list">
            {elements}
        </ul>
    )
}

export default PostList;