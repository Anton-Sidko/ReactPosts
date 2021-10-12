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
                },
                {
                    id: Math.random(),
                    label: 'Делаю учебное приложение',
                },
                {
                    id: Math.random(),
                    label: 'Это простая записная книжка, в которую можно добавлять задачи/записи',
                }
            ],
            searchItem: '',
            filter: 'all'
        }
    }

    componentDidMount() {
        if (localStorage.getItem('posts')) {
            this.setState(() => {
                return {
                    data: JSON.parse(localStorage.getItem('posts'))
                }
            })
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
            id: Math.random()
        }

        this.setState(({data}) => {
            const postsArr = [...data, newItem];

            return {
                data: postsArr
            }
        }, () => localStorage.setItem('posts', JSON.stringify(this.state.data)))
    }

    onToggleStatus = (id, event) => {

        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const target = event.target;
            let changeElem = data[index];
            //Можно переписать свойство используя spred оператор
            //const newItem = {...changeElem, like: !changeElem.like}

            if (target.classList.contains('fa-star')) {
                changeElem.important = !changeElem.important;
            } else if (target.classList.contains('app-list-item-label')) {
                changeElem.like = !changeElem.like;
            }

            const postsArr = [...data.slice(0, index), {...changeElem},...data.slice(index+1)];

            return {
                data: postsArr
            }
        }, () => localStorage.setItem('posts', JSON.stringify(this.state.data)))
    }

    searchPost(items, searchItem) {
        if (!searchItem.length) {
            return items
        }

        return items.filter((item) => {
            return item.label.includes(searchItem)
        })
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter((item) => item.like)
        }

        if (filter === 'all') {
            return items
        }
    }

    onUpdateSearch = (searchItem) => {
        this.setState({searchItem});
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {
                data,
                searchItem,
                filter} = this.state;

                const likedPosts = data.filter(item => item.like).length;
        const countPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, searchItem), filter);

        return (
            <div className="app">
                <AppHeader
                    countPosts = {countPosts}
                    likedPosts = {likedPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleStatus={this.onToggleStatus}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}
