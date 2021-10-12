import React from "react";

import './app-header.sass';

const AppHeader = ({countPosts, likedPosts}) => {
    return (
        <div className="app-header">
            <h1>Записная книжка</h1>
            <h2>{countPosts} {(!countPosts
                                ? 'записей'
                                : countPosts === 1
                                ? 'запись'
                                : countPosts > 1 && countPosts < 5
                                ? 'записи' : 'записей')
            }, из них понравилось {likedPosts}</h2>
        </div>
    )
}

export default AppHeader;