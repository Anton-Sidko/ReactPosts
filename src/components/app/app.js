import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.sass'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: Math.random(),
                    label: 'Изучаю React',
                    important: false,
                    like: false
                },
                {
                    id: Math.random(),
                    label: 'Делаю учебное приложение',
                    important: false,
                    like: false
                },
                {
                    id: Math.random(),
                    label: 'Я люблю узнавать что-то новое',
                    important: false,
                    like: false
                }
            ],
            likedPosts: 0
        }
    }

    componentDidMount() {
        if (localStorage.getItem('posts')) {
            this.setState(() => {
                return {
                    data: JSON.parse(localStorage.getItem('posts'))
                }
            }, () => this.countLiked())
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const postsArr = [...data.slice(0, index), ...data.slice(index+1)];

            return {
                data: postsArr
            }
        }, () => localStorage.setItem('posts', JSON.stringify(this.state.data)))
    }

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: Math.random()
        }

        this.setState(({data}) => {
            const postsArr = [...data, newItem];

            return {
                data: postsArr
            }
        }, () => localStorage.setItem('posts', JSON.stringify(this.state.data)))
    }

    countLiked = () => {
        let count = 0;
        this.setState(({data}) => {
            data.forEach(elem => {
                if (elem.like === true) {
                    count += 1;
                }
            })

            return {
                ...data,
                likedPosts: count
            }
        })
    }

    changeStatus = (id, event) => {

        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const target = event.target;
            let changeElem = data[index];

            if (target.classList.contains('fa-star')) {
                changeElem.important = !changeElem.important;
            } else if (target.classList.contains('app-list-item-label')) {
                changeElem.like = !changeElem.like;
                this.countLiked();
            }

            const postsArr = [...data.slice(0, index), {...changeElem},...data.slice(index+1)];


            return {
                data: postsArr
            }
        }, () => localStorage.setItem('posts', JSON.stringify(this.state.data)))
    }

    render() {
        return (
            <div className="app">
                <AppHeader
                    countPosts = {this.state.data.length}
                    likedPosts = {this.state.likedPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList
                    posts={this.state.data}
                    onDelete={this.deleteItem}
                    changeStatus={this.changeStatus}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}
