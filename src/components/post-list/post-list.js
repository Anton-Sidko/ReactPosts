import React from "react";

import PostListItem from '../post-list-item';
import './post-list.sass';

const PostList = ({ posts,
                    onDelete = Function.prototype,
                    onToggleStatus = Function.prototype }) => {

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
                    onToggleStatus={(event) => onToggleStatus(id, event)}
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